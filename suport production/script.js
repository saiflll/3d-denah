(() => {
    /* ============================================================
       1. KONSTANTA & VARIABEL GRID (Grid Constants from Config)
       ============================================================ */
    const gConf = window.gridConfig || { mapWidth: 297, mapHeight: 210, cols: 90, rows: 90, flatHeight: 0.025, normalHeight: 0.75, viewPadding: 1.35 };
    
    // Ukuran Full Size Denah Asli (Sesuai SVG)
    const MAP_W = gConf.mapWidth || 297;
    const MAP_D = gConf.mapHeight || 210;

    // Jumlah grid yang bisa disesuaikan
    const COLS = gConf.cols || 90;
    const ROWS = gConf.rows || 90;
    const COUNT = COLS * ROWS;

    // Ukuran satu sel mengikuti proporsi denah
    const CELL_W = MAP_W / COLS;
    const CELL_D = MAP_D / ROWS;

    const FLAT_H = gConf.flatHeight ?? 0.025;
    const NORMAL_H = gConf.normalHeight ?? 0.75;

    const container = document.getElementById('map');
    const overlay = document.getElementById('ui-overlay');
    const presets = window.sitePoints || window.chartPresets || [];
    const theme = window.mapTheme || {};

    let scene, camera, renderer, cells, floor;
    let isFlat = true, currentPresetId = null;
    const markerElements = [];

    const dummy = new THREE.Object3D();
    const baseColor = new THREE.Color(theme.cellBaseColor || 0x2e8cad);
    const heights = new Float32Array(COUNT).fill(FLAT_H);

    /* ============================================================
       2. KALKULASI & KONFIGURASI KAMERA (Camera Helpers)
       ============================================================ */
    function calculateFitRadius() {
        const aspect = container.clientWidth / container.clientHeight;
        const fov = 35 * (Math.PI / 180);
        let dist = (Math.max(MAP_W, MAP_D) / 2) / Math.tan(fov / 2);
        if (aspect < 1) dist /= aspect;
        return dist * (gConf.viewPadding || 1.35);
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

    /* ============================================================
       3. TRANSFORMASI SEL GRID 3D (3D Instance Positioning)
       ============================================================ */
    function indexToCell(index) {
        return { col: index % COLS, row: Math.floor(index / COLS) };
    }

    function cellTo3DPosition(col, row, height = 0) {
        const x = (col + 0.5) * CELL_W - MAP_W / 2;
        const z = (row + 0.5) * CELL_D - MAP_D / 2;
        return new THREE.Vector3(x, height / 2, z);
    }

    function setInstance(index, height) {
        const { col, row } = indexToCell(index);
        const pos = cellTo3DPosition(col, row, height);
        dummy.position.set(pos.x, pos.y, pos.z);
        
        if (height <= FLAT_H + 0.001) {
            dummy.scale.set(0, 0, 0);
        } else {
            dummy.scale.set(CELL_W * 0.90, height, CELL_D * 0.90);
        }

        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        cells.setMatrixAt(index, dummy.matrix);
    }

    /* ============================================================
       4. SINKRONISASI TOMBOL PIN OVERLAY (Overlay Pin Marker)
       ============================================================ */
    function createSiteMarkers() {
        overlay.innerHTML = '';
        markerElements.length = 0;

        presets.forEach(preset => {
            const btn = document.createElement('button');
            btn.className = 'btn-marker-card';
            btn.id = `btn-${preset.id}`;
            btn.style.setProperty('--active-color', preset.color || '#38bdf8');
            
            btn.innerHTML = `
                <div class="marker-dot-wrapper">
                    <span class="marker-pulse"></span>
                    <span class="marker-dot"></span>
                </div>
                <span class="marker-label">${preset.name}</span>
            `;

            btn.onclick = (e) => {
                e.stopPropagation();
                applyPreset(preset.id);
            };
            overlay.appendChild(btn);

            const col = (preset.pin?.col || 45) - 1;
            const row = (preset.pin?.row || 45) - 1;
            markerElements.push({ element: btn, pos3D: cellTo3DPosition(col, row, 1), presetId: preset.id });
        });

        updateMarkerPositions();
    }

    function setActiveMarker(activeId) {
        markerElements.forEach(item => {
            if (item.presetId === activeId) {
                item.element.classList.add('active');
            } else {
                item.element.classList.remove('active');
            }
        });
    }

    function updateMarkerPositions() {
        if (!camera || !renderer) return;
        const w = container.clientWidth, h = container.clientHeight;

        markerElements.forEach(item => {
            const vector = item.pos3D.clone();
            vector.project(camera);

            if (vector.z > 1 || vector.z < -1) {
                item.element.style.display = 'none';
                return;
            }
            item.element.style.display = 'flex';
            item.element.style.left = `${(vector.x * 0.5 + 0.5) * w}px`;
            item.element.style.top = `${(-(vector.y * 0.5) + 0.5) * h}px`;
        });
    }

    /* ============================================================
       5. INISIALISASI THREE.JS (Scene & Mesh Setup)
       ============================================================ */
    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(theme.sceneBg || 0x07111b);

        camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        cam.radius = calculateFitRadius();

        // Pencahayaan
        const hl = theme.hemiLight || { sky: 0xaeeaff, ground: 0x07111b, intensity: 0.85 };
        scene.add(new THREE.HemisphereLight(hl.sky, hl.ground, hl.intensity));

        const dl = theme.dirLight || { color: 0xffffff, intensity: 0.9, pos: [50, 100, 40] };
        const dir = new THREE.DirectionalLight(dl.color, dl.intensity);
        dir.position.set(...dl.pos);
        dir.castShadow = true;
        dir.shadow.mapSize.set(2048, 2048);
        scene.add(dir);

        // 1. LAYER DASAR: Lantai Background Gambar Peta SVG Sesuai Ukuran Aslinya (MAP_W x MAP_D)
        const textureLoader = new THREE.TextureLoader();
        const mapTexture = textureLoader.load(theme.bgTexture || 'drawing-1.svg');
        mapTexture.generateMipmaps = true;
        mapTexture.minFilter = THREE.LinearMipmapLinearFilter;

        floor = new THREE.Mesh(
            new THREE.PlaneGeometry(MAP_W, MAP_D),
            new THREE.MeshBasicMaterial({
                map: mapTexture,
                transparent: true,
                opacity: 0.95
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0.0;
        floor.receiveShadow = false;
        scene.add(floor);

        // 2. LAYER TENGAH: Garis Grid Outline Transparan Sesuai Pembagian Grid Kolom/Baris
        const gridHelper = new THREE.GridHelper(Math.max(MAP_W, MAP_D), Math.max(COLS, ROWS), theme.gridPrimary || 0x1e5a78, theme.gridSecondary || 0x143c52);
        gridHelper.scale.set(MAP_W / Math.max(MAP_W, MAP_D), 1, MAP_D / Math.max(MAP_W, MAP_D));
        gridHelper.position.y = 0.005;
        scene.add(gridHelper);

        // Instanced Mesh Cells (Hanya bar yang naik yang berwujud solid)
        cells = new THREE.InstancedMesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: theme.cellRoughness || 0.5,
                metalness: theme.cellMetalness || 0.03
            }),
            COUNT
        );
        cells.castShadow = true;
        cells.receiveShadow = true;
        cells.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        // Set ketinggian & warna awal (termasuk titik statis permanen)
        applyStaticAndPresetCells(heights, null);
        for (let i = 0; i < COUNT; i++) {
            setInstance(i, heights[i]);
        }
        cells.instanceMatrix.needsUpdate = true;
        cells.instanceColor.needsUpdate = true;
        scene.add(cells);

        updateCamera();
        attachControls();
        createSiteMarkers();

        window.addEventListener('resize', onResize);
        animate();
    }

    /* ============================================================
       6. KONTROL INTERAKSI (Mouse & Touch Controls)
       ============================================================ */
    let dragging = false, lastX = 0, lastY = 0, dragDist = 0;

    function attachControls() {
        const dom = renderer.domElement;

        dom.addEventListener('pointerdown', e => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            dragDist = 0;
            dom.setPointerCapture(e.pointerId);
        });

        dom.addEventListener('pointermove', e => {
            if (!dragging) return;
            const dx = e.clientX - lastX, dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            dragDist += Math.abs(dx) + Math.abs(dy);

            if (cam.animating) return;
            cam.theta -= dx * 0.005;
            cam.phi = Math.max(0.15, Math.min(1.4, cam.phi - dy * 0.005));

            updateCamera();
            updateMarkerPositions();
        });

        dom.addEventListener('pointerup', () => {
            dragging = false;
            if (dragDist < 5 && !cam.animating && !isFlat) {
                reset2D();
            }
        });

        dom.addEventListener('pointerleave', () => dragging = false);

        dom.addEventListener('wheel', e => {
            e.preventDefault();
            if (cam.animating) return;
            cam.radius = Math.max(30, Math.min(350, cam.radius + e.deltaY * 0.06));
            updateCamera();
            updateMarkerPositions();
        }, { passive: false });
    }

    /* ============================================================
       7. LOGIKA PRESET, STATIC CELLS & RESET (Apply Preset & Reset)
       ============================================================ */
    function processCellItem(item, callback) {
        // Jika format rentang area: fromRow - toRow dan fromCol - toCol
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
            // Format titik tunggal { row, col }
            const r = item.row ?? item.Row;
            const c = item.col ?? item.Col;
            if (r !== undefined && c !== undefined) {
                callback(r, c, item.height, item.color);
            }
        }
    }

    function applyStaticAndPresetCells(targetArray, activePreset) {
        // 1. Set dasar semua ke flat (outline only)
        targetArray.fill(FLAT_H);
        for (let i = 0; i < COUNT; i++) cells.setColorAt(i, baseColor);

        // 2. Terapkan Titik Statis Permanen
        const staticList = window.staticCells || [];
        staticList.forEach(item => {
            processCellItem(item, (r, c, h, color) => {
                const idx = (r - 1) * COLS + (c - 1);
                if (idx >= 0 && idx < COUNT) {
                    targetArray[idx] = h || 1;
                    if (color) cells.setColorAt(idx, new THREE.Color(color));
                }
            });
        });

        // 3. Terapkan Bar Preset Aktif (Area Blok atau Titik Satuan)
        if (activePreset && activePreset.cells) {
            activePreset.cells.forEach(item => {
                processCellItem(item, (r, c, h, color) => {
                    const idx = (r - 1) * COLS + (c - 1);
                    if (idx >= 0 && idx < COUNT) {
                        targetArray[idx] = h || 10;
                        if (color) cells.setColorAt(idx, new THREE.Color(color));
                    }
                });
            });
        }

        cells.instanceColor.needsUpdate = true;
    }

    function applyPreset(presetId) {
        const preset = presets.find(p => p.id === presetId);
        if (!preset) return;

        currentPresetId = presetId;
        isFlat = false;
        setActiveMarker(presetId);

        const startHeights = heights.slice();
        const endHeights = new Float32Array(COUNT);
        applyStaticAndPresetCells(endHeights, preset);

        // 1. Hitung Bounding Box (Titik Tengah & Luas Area) dari seluruh bar yang dinaikkan
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

        // Jika tidak ada cell terdaftar, fallback ke posisi pin tombol
        if (minR === Infinity) {
            minR = maxR = preset.pin?.row || 45;
            minC = maxC = preset.pin?.col || 45;
        }

        // 2. Tentukan Titik Tengah Pusat Area Chart (Center of Bounding Box)
        const centerCol = ((minC + maxC) / 2) - 1;
        const centerRow = ((minR + maxR) / 2) - 1;
        const target = cellTo3DPosition(centerCol, centerRow, 0);

        // 3. Hitung Radius Kamera Otomatis agar SELURUH area bar yang naik pas di layar
        const spanW = (maxC - minC + 1) * CELL_W;
        const spanD = (maxR - minR + 1) * CELL_D;
        const maxSpan = Math.max(spanW, spanD, maxH * 2);
        
        // Jarak kamera proporsional terhadap ukuran area blok chart
        const autoRadius = Math.max(50, Math.min(260, maxSpan * 1.5 + 40));

        const camStart = { ...cam };
        const camEnd = {
            // Bisa override custom camera dari config jika didefinisikan (misal: preset.camera.theta)
            theta: preset.camera?.theta !== undefined ? preset.camera.theta : (cam.theta + 0.45),
            phi: preset.camera?.phi !== undefined ? preset.camera.phi : 0.85,
            radius: preset.camera?.radius !== undefined ? preset.camera.radius : autoRadius,
            targetX: target.x,
            targetY: Math.min(maxH / 2, 5),
            targetZ: target.z
        };

        transition(camStart, camEnd, startHeights, endHeights, 850);
    }

    function reset2D() {
        isFlat = true;
        currentPresetId = null;
        setActiveMarker(null);

        const startHeights = heights.slice();
        const endHeights = new Float32Array(COUNT);
        applyStaticAndPresetCells(endHeights, null); // Tetap mempertahankan titik statis

        const camStart = { ...cam };
        const camEnd = {
            theta: 0,
            phi: 0.01,
            radius: calculateFitRadius(),
            targetX: 0,
            targetY: 0,
            targetZ: 0
        };

        transition(camStart, camEnd, startHeights, endHeights, 700);
    }

    /* ============================================================
       8. NAVIGASI TOOLBAR (Toolbar Navigation Actions)
       ============================================================ */
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
        if (presets.length > 0) {
            applyPreset(currentPresetId || presets[0].id);
        }
    }

    function animateRadius(toRadius) {
        const from = cam.radius;
        const start = performance.now();
        function step(now) {
            const t = Math.min(1, (now - start) / 300);
            cam.radius = from + (toRadius - from) * ease(t);
            updateCamera();
            updateMarkerPositions();
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ============================================================
       9. ENGINE TRANSISI & ANIMASI (Animation Engine)
       ============================================================ */
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function transition(camStart, camEnd, startHeights, endHeights, duration) {
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
            updateMarkerPositions();

            for (let i = 0; i < COUNT; i++) {
                const h = startHeights[i] + (endHeights[i] - startHeights[i]) * k;
                heights[i] = h;
                setInstance(i, h);
            }

            cells.instanceMatrix.needsUpdate = true;

            if (t < 1) {
                requestAnimationFrame(frame);
            } else {
                cam.animating = false;
                updateMarkerPositions();
            }
        }

        requestAnimationFrame(frame);
    }

    /* ============================================================
       10. RESIZE & ANIMATION LOOP (Render Loop)
       ============================================================ */
    function onResize() {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (isFlat && !currentPresetId) {
            cam.radius = calculateFitRadius();
            updateCamera();
        }
        updateMarkerPositions();
    }

    function animate() {
        renderer.render(scene, camera);
        updateMarkerPositions();
        requestAnimationFrame(animate);
    }

    // Expose ke global
    window.applyPreset = applyPreset;
    window.reset2D = reset2D;
    window.zoomIn = zoomIn;
    window.zoomOut = zoomOut;
    window.fitView = fitView;
    window.focusCurrentTarget = focusCurrentTarget;

    init();
})();
