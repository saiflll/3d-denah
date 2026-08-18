import * as THREE from 'three';
import { gridConfig } from '../config/config-grid.js';
import { mapTheme } from '../config/theme-styles.js';
import { staticCells, sitePoints } from '../config/config-points.js';

export function createThreeEngine(container, options = {}) {
    const onResetCallback = options.onReset;
    const MAP_W = gridConfig.mapWidth || 297;
    const MAP_D = gridConfig.mapHeight || 210;
    const COLS = gridConfig.cols || 90;
    const ROWS = gridConfig.rows || 90;
    const COUNT = COLS * ROWS;

    const CELL_W = MAP_W / COLS;
    const CELL_D = MAP_D / ROWS;

    const FLAT_H = gridConfig.flatHeight ?? 0.025;
    const NORMAL_H = gridConfig.normalHeight ?? 0.75;

    let scene, camera, renderer, cells, floor;
    let isFlat = true, currentPresetId = null;
    let animationFrameId = null;

    const dummy = new THREE.Object3D();
    const baseColor = new THREE.Color(mapTheme.cellBaseColor || 0x2e8cad);
    const heights = new Float32Array(COUNT).fill(FLAT_H);
    const cellDelays = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        cellDelays[i] = (Math.sin(i * 12.9898 + (i % COLS) * 78.233) * 0.5 + 0.5) * 0.35;
    }

    function calculateFitRadius() {
        const aspect = container.clientWidth / container.clientHeight;
        const fov = 35 * (Math.PI / 180);
        let dist = (Math.max(MAP_W, MAP_D) / 2) / Math.tan(fov / 2);
        if (aspect < 1) dist /= aspect;
        return dist * (gridConfig.viewPadding || 1.35);
    }

    const cam = {
        theta: 0, phi: 0.01, radius: 250,
        targetX: 0, targetY: 0, targetZ: 0,
        animating: false
    };

    function updateCamera() {
        camera.position.x = cam.targetX + cam.radius * Math.sin(cam.phi) * Math.sin(cam.theta);
        camera.position.z = cam.targetZ + cam.radius * Math.sin(cam.phi) * Math.cos(cam.theta);
        camera.position.y = cam.targetY + cam.radius * Math.cos(cam.phi);
        camera.lookAt(cam.targetX, cam.targetY, cam.targetZ);
    }

    function indexToCell(index) {
        return { col: index % COLS, row: Math.floor(index / COLS) };
    }

    function cellTo3DPosition(col, row, height = 0) {
        const x = (col + 0.5) * CELL_W - MAP_W / 2;
        const z = (row + 0.5) * CELL_D - MAP_D / 2;
        return new THREE.Vector3(x, height / 2, z);
    }

    const gapFactor = mapTheme.cellGapFactor !== undefined ? mapTheme.cellGapFactor : 1.0;

    function setInstance(index, height) {
        const { col, row } = indexToCell(index);
        const pos = cellTo3DPosition(col, row, height);

        dummy.position.set(pos.x, pos.y, pos.z);
        if (height <= FLAT_H + 0.001) {
            dummy.scale.set(0, 0, 0);
        } else {
            dummy.scale.set(CELL_W * gapFactor, height, CELL_D * gapFactor);
        }
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        cells.setMatrixAt(index, dummy.matrix);
    }

    function processCellItem(item, callback) {
        if (item.fromRow !== undefined && item.toRow !== undefined && item.fromCol !== undefined && item.toCol !== undefined) {
            const minR = Math.min(item.fromRow, item.toRow);
            const maxR = Math.max(item.fromRow, item.toRow);
            const minC = Math.min(item.fromCol, item.toCol);
            const maxC = Math.max(item.fromCol, item.toCol);
            for (let r = minR; r <= maxR; r++) {
                for (let c = minC; c <= maxC; c++) {
                    callback(r, c, item.height, item.color);
                }
            }
        } else {
            const r = item.row ?? item.Row;
            const c = item.col ?? item.Col;
            if (r !== undefined && c !== undefined) {
                callback(r, c, item.height, item.color);
            }
        }
    }

    function applyStaticAndPresetCells(targetArray, activePreset) {
        targetArray.fill(FLAT_H);
        for (let i = 0; i < COUNT; i++) {
            cells.setColorAt(i, baseColor);
        }

        staticCells.forEach(item => {
            processCellItem(item, (r, c, h, color) => {
                const idx = (r - 1) * COLS + (c - 1);
                if (idx >= 0 && idx < COUNT) {
                    targetArray[idx] = h || 1;
                    if (color) {
                        cells.setColorAt(idx, new THREE.Color(color));
                    }
                }
            });
        });

        if (activePreset && activePreset.cells) {
            activePreset.cells.forEach(item => {
                processCellItem(item, (r, c, h, color) => {
                    const idx = (r - 1) * COLS + (c - 1);
                    if (idx >= 0 && idx < COUNT) {
                        targetArray[idx] = h || 10;
                        if (color) {
                            cells.setColorAt(idx, new THREE.Color(color));
                        }
                    }
                });
            });
        }

        cells.instanceColor.needsUpdate = true;
    }

    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function transition(camStart, camEnd, startHeights, endHeights, duration, isReset = false, isSequentialPerimeter = false) {
        cam.animating = true;
        const start = performance.now();

        function frame(now) {
            const t = Math.min(1, (now - start) / duration);
            const k = ease(t);

            cam.theta = camStart.theta + (camEnd.theta - camStart.theta) * k;
            cam.phi = camStart.phi + (camEnd.phi - camStart.phi) * k;
            cam.radius = camStart.radius + (camEnd.radius - camStart.radius) * k;
            cam.targetX = (camStart.targetX || 0) + ((camEnd.targetX || 0) - (camStart.targetX || 0)) * k;
            cam.targetY = (camStart.targetY || 0) + ((camEnd.targetY || 0) - (camStart.targetY || 0)) * k;
            cam.targetZ = (camStart.targetZ || 0) + ((camEnd.targetZ || 0) - (camStart.targetZ || 0)) * k;

            updateCamera();

            for (let i = 0; i < COUNT; i++) {
                const sH = startHeights[i];
                const eH = endHeights[i];

                if (Math.abs(eH - sH) < 0.001) continue;

                let localProgress;
                if (isReset) {
                    localProgress = k;
                } else if (isSequentialPerimeter) {
                    const { col, row } = indexToCell(i);
                    let order = 0;
                    if (row >= 60) order = (col / COLS) * 0.35;
                    else if (col >= 90) order = 0.35 + ((ROWS - row) / ROWS) * 0.35;
                    else if (row <= 10) order = 0.70 + ((COLS - col) / COLS) * 0.20;
                    else order = 0.90 + (row / ROWS) * 0.10;

                    const activeWindow = 0.45;
                    const startTime = order * 0.55;
                    const cellT = Math.max(0, Math.min(1, (t - startTime) / activeWindow));
                    localProgress = ease(cellT);
                } else {
                    const delay = cellDelays[i];
                    const activeWindow = 1.0 - delay;
                    const cellT = Math.max(0, Math.min(1, (t - delay) / activeWindow));
                    localProgress = ease(cellT);
                }

                const h = sH + (eH - sH) * localProgress;
                heights[i] = h;
                setInstance(i, h);
            }

            cells.instanceMatrix.needsUpdate = true;

            if (t < 1) {
                requestAnimationFrame(frame);
            } else {
                cam.animating = false;
            }
        }

        requestAnimationFrame(frame);
    }

    // Interactive Camera Controls
    let dragging = false, lastX = 0, lastY = 0, dragDist = 0;

    function attachControls() {
        const dom = renderer.domElement;

        const onPointerDown = (e) => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            dragDist = 0;
            dom.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e) => {
            if (!dragging) return;
            const dx = e.clientX - lastX, dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            dragDist += Math.abs(dx) + Math.abs(dy);

            if (cam.animating) return;
            cam.theta -= dx * 0.005;
            cam.phi = Math.max(0.15, Math.min(1.4, cam.phi - dy * 0.005));
            updateCamera();
        };

        const onPointerUp = () => {
            dragging = false;
            if (dragDist < 5 && !cam.animating && !isFlat) {
                reset2D();
            }
        };

        const onWheel = (e) => {
            e.preventDefault();
            if (cam.animating) return;
            cam.radius = Math.max(30, Math.min(350, cam.radius + e.deltaY * 0.06));
            updateCamera();
        };

        dom.addEventListener('pointerdown', onPointerDown);
        dom.addEventListener('pointermove', onPointerMove);
        dom.addEventListener('pointerup', onPointerUp);
        dom.addEventListener('wheel', onWheel, { passive: false });
    }

    // Public Control API
    function applyPreset(presetId) {
        const preset = sitePoints.find(p => p.id === presetId);
        if (!preset) return;

        currentPresetId = presetId;
        isFlat = false;

        const startHeights = heights.slice();
        const endHeights = new Float32Array(COUNT);
        applyStaticAndPresetCells(endHeights, preset);

        let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity;
        let maxH = 1;

        if (preset.cells && preset.cells.length > 0) {
            preset.cells.forEach(item => {
                processCellItem(item, (r, c, h) => {
                    if (r < minR) minR = r;
                    if (r > maxR) maxR = r;
                    if (c < minC) minC = c;
                    if (c > maxC) maxC = c;
                    if (h && h > maxH) maxH = h;
                });
            });
        }

        if (minR === Infinity) {
            minR = maxR = preset.pin?.row || 45;
            minC = maxC = preset.pin?.col || 45;
        }

        const centerCol = ((minC + maxC) / 2) - 1;
        const centerRow = ((minR + maxR) / 2) - 1;
        const target = cellTo3DPosition(centerCol, centerRow, 0);

        const spanW = (maxC - minC + 1) * CELL_W;
        const spanD = (maxR - minR + 1) * CELL_D;
        const maxSpan = Math.max(spanW, spanD, maxH * 2);
        const autoRadius = Math.max(50, Math.min(260, maxSpan * 1.5 + 40));

        const camStart = { ...cam };
        const camEnd = {
            theta: preset.camera?.theta !== undefined ? preset.camera.theta : (cam.theta + 0.45),
            phi: preset.camera?.phi !== undefined ? preset.camera.phi : 0.85,
            radius: preset.camera?.radius !== undefined ? preset.camera.radius : autoRadius,
            targetX: target.x,
            targetY: Math.min(maxH / 2, 5),
            targetZ: target.z
        };

        transition(camStart, camEnd, startHeights, endHeights, 950, false);
        return preset;
    }

    function reset2D() {
        isFlat = true;
        currentPresetId = null;

        const startHeights = heights.slice();
        const endHeights = new Float32Array(COUNT);
        applyStaticAndPresetCells(endHeights, null);

        const camStart = { ...cam };
        const camEnd = {
            theta: 0,
            phi: 0.01,
            radius: calculateFitRadius(),
            targetX: 0,
            targetY: 0,
            targetZ: 0
        };

        transition(camStart, camEnd, startHeights, endHeights, 650, true);

        if (typeof onResetCallback === 'function') {
            onResetCallback();
        }
    }

    function switchCategory(categoryName) {
        isFlat = true;
        currentPresetId = null;

        const startHeights = heights.slice();
        const endHeights = new Float32Array(COUNT);
        applyStaticAndPresetCells(endHeights, null);

        const camStart = { ...cam };
        const camEnd = {
            theta: cam.theta,
            phi: 0.01,
            radius: calculateFitRadius(),
            targetX: 0,
            targetY: 0,
            targetZ: 0
        };

        transition(camStart, camEnd, startHeights, endHeights, 600, true);
    }

    function zoomIn() {
        if (!cam.animating) animateRadius(Math.max(30, cam.radius * 0.75));
    }

    function zoomOut() {
        if (!cam.animating) animateRadius(Math.min(350, cam.radius * 1.35));
    }

    function fitView() {
        const camStart = { ...cam };
        const camEnd = {
            theta: cam.theta,
            phi: isFlat ? 0.01 : 0.8,
            radius: calculateFitRadius(),
            targetX: 0,
            targetY: isFlat ? 0 : 2,
            targetZ: 0
        };
        transition(camStart, camEnd, heights, heights, 500);
    }

    function focusCurrentTarget() {
        if (sitePoints.length > 0) {
            return applyPreset(currentPresetId || sitePoints[0].id);
        }
    }

    function animateRadius(toRadius) {
        const from = cam.radius;
        const start = performance.now();
        function step(now) {
            const t = Math.min(1, (now - start) / 300);
            cam.radius = from + (toRadius - from) * ease(t);
            updateCamera();
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function project3DTo2D(col, row, height = 0.2) {
        if (!camera || !renderer) return null;
        // pin.col dan pin.row adalah 1-based, dikonversi ke 0-indexed dengan - 1
        const pos3D = cellTo3DPosition(col - 1, row - 1, height);
        pos3D.project(camera);

        if (pos3D.z > 1 || pos3D.z < -1) return null;
        const w = container.clientWidth, h = container.clientHeight;
        return {
            x: (pos3D.x * 0.5 + 0.5) * w,
            y: (-(pos3D.y * 0.5) + 0.5) * h
        };
    }

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(mapTheme.sceneBg || 0x07111b);

        camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        cam.radius = calculateFitRadius();

        const hl = mapTheme.hemiLight || { sky: 0xaeeaff, ground: 0x07111b, intensity: 0.85 };
        scene.add(new THREE.HemisphereLight(hl.sky, hl.ground, hl.intensity));

        const dl = mapTheme.dirLight || { color: 0xffffff, intensity: 1.1, pos: [60, 120, 50] };
        const dir = new THREE.DirectionalLight(dl.color, dl.intensity);
        dir.position.set(dl.pos[0], dl.pos[1], dl.pos[2]);
        dir.castShadow = true;
        dir.shadow.mapSize.set(2048, 2048);
        dir.shadow.camera.near = 0.5;
        dir.shadow.camera.far = 400;
        dir.shadow.camera.left = -MAP_W / 1.5;
        dir.shadow.camera.right = MAP_W / 1.5;
        dir.shadow.camera.top = MAP_D / 1.5;
        dir.shadow.camera.bottom = -MAP_D / 1.5;
        dir.shadow.bias = -0.0005;
        dir.shadow.radius = 3.5;
        scene.add(dir);

        const textureLoader = new THREE.TextureLoader();
        const mapTexture = textureLoader.load(mapTheme.bgTexture || '/drawing-1.svg');
        mapTexture.generateMipmaps = true;
        mapTexture.minFilter = THREE.LinearMipmapLinearFilter;

        const bgW = MAP_W * (gridConfig.bgScaleX || 1.0);
        const bgD = MAP_D * (gridConfig.bgScaleY || 1.0);
        const offX = gridConfig.bgOffsetX || 0.0;
        const offZ = gridConfig.bgOffsetY || 0.0;

        floor = new THREE.Mesh(
            new THREE.PlaneGeometry(bgW, bgD),
            new THREE.MeshStandardMaterial({
                map: mapTexture,
                transparent: true,
                opacity: 0.98,
                roughness: 0.8,
                metalness: 0.05
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(offX, 0, offZ);
        floor.receiveShadow = true;
        scene.add(floor);

        if (mapTheme.showGridLines !== false) {
            const gridHelper = new THREE.GridHelper(Math.max(MAP_W, MAP_D), Math.max(COLS, ROWS), mapTheme.gridPrimary || 0x1e5a78, mapTheme.gridSecondary || 0x113347);
            gridHelper.scale.set(MAP_W / Math.max(MAP_W, MAP_D), 1, MAP_D / Math.max(MAP_W, MAP_D));
            gridHelper.position.y = 0.005;
            if (gridHelper.material) {
                gridHelper.material.transparent = true;
                gridHelper.material.opacity = mapTheme.gridOpacity !== undefined ? mapTheme.gridOpacity : 0.45;
            }
            scene.add(gridHelper);
        }

        const cellMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.22,
            metalness: 0.15
        });

        cells = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), cellMaterial, COUNT);
        cells.castShadow = true;
        cells.receiveShadow = true;
        cells.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        applyStaticAndPresetCells(heights, null);
        for (let i = 0; i < COUNT; i++) {
            setInstance(i, FLAT_H);
        }
        cells.instanceMatrix.needsUpdate = true;
        cells.instanceColor.needsUpdate = true;
        scene.add(cells);

        updateCamera();
        attachControls();

        // Intro animation
        setTimeout(() => {
            const startH = new Float32Array(COUNT).fill(FLAT_H);
            const targetH = new Float32Array(COUNT);
            applyStaticAndPresetCells(targetH, null);

            const camStart = { theta: 0, phi: 0.01, radius: calculateFitRadius() * 1.05, targetX: 0, targetY: 0, targetZ: 0 };
            const camEnd = { theta: 0, phi: 0.01, radius: calculateFitRadius(), targetX: 0, targetY: 0, targetZ: 0 };
            transition(camStart, camEnd, startH, targetH, 1400, false, true);
        }, 100);

        function animate() {
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();
    }

    function onResize() {
        if (!container || !camera || !renderer) return;
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (isFlat && !currentPresetId) {
            cam.radius = calculateFitRadius();
            updateCamera();
        }
    }

    function destroy() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (renderer && renderer.domElement) {
            renderer.domElement.remove();
            renderer.dispose();
        }
    }

    init();

    return {
        applyPreset,
        reset2D,
        switchCategory,
        zoomIn,
        zoomOut,
        fitView,
        focusCurrentTarget,
        project3DTo2D,
        onResize,
        destroy,
        getCurrentPresetId: () => currentPresetId
    };
}
