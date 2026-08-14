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

    const gapFactor = theme.cellGapFactor !== undefined ? theme.cellGapFactor : 1.0;

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

    /* ============================================================
       4. SINKRONISASI TOMBOL PIN OVERLAY & KARTU INFO (Overlay Pin Marker & Info Card)
       ============================================================ */
    let infoCardElement = null;

    function renderInfoCard(preset) {
        if (!infoCardElement) {
            infoCardElement = document.createElement('div');
            infoCardElement.className = 'site-info-card';
            overlay.appendChild(infoCardElement);
        }

        if (!preset || !preset.card) {
            hideInfoCard();
            return;
        }

        const cardData = preset.card;
        const posClass = `pos-${cardData.position || 'top-left'}`;

        infoCardElement.className = `site-info-card ${posClass}`;
        infoCardElement.style.setProperty('--card-theme-color', preset.color || '#38bdf8');

        let metricsHtml = '';
        if (cardData.metrics && Array.isArray(cardData.metrics)) {
            metricsHtml = `
                <div class="card-metrics-grid">
                    ${cardData.metrics.map(m => `
                        <div class="metric-item">
                            <span class="metric-label">${m.label}</span>
                            <span class="metric-value" style="--metric-color: ${m.color || preset.color || '#38bdf8'}">${m.value}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let infoHtml = '';
        if (cardData.info) {
            infoHtml = `<div class="card-info-text">${cardData.info}</div>`;
        }

        infoCardElement.innerHTML = `
            <div class="card-header">
                <div class="card-title-group">
                    <span class="card-title">${cardData.title || preset.name}</span>
                    <span class="card-subtitle">${cardData.subtitle || 'Production Area Info'}</span>
                </div>
                <button class="card-close-btn" title="Tutup Card" onclick="window.closeSiteInfoCard()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            ${metricsHtml}
            ${infoHtml}
        `;

        // Animasi muncul kartu
        setTimeout(() => {
            if (infoCardElement) infoCardElement.classList.add('visible');
        }, 100);
    }

    function hideInfoCard() {
        if (infoCardElement) {
            infoCardElement.classList.remove('visible');
        }
    }

    let currentCategory = 'produksi';

    window.switchCategory = function (categoryName) {
        if (currentCategory === categoryName) return;
        currentCategory = categoryName;

        // Update active class pada tombol tab kategori di UI
        document.querySelectorAll('.cat-tab-btn').forEach(btn => {
            if (btn.dataset.category === categoryName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 🎬 Transisi Sinematik Kamera saat ganti kategori (Slight dynamic tilt & return)
        isFlat = true;
        currentPresetId = null;
        hideInfoCard();

        const startHeights = heights.slice();
        const endHeights = new Float32Array(COUNT);
        applyStaticAndPresetCells(endHeights, null);

        const camStart = { ...cam };
        // Gerakan kamera sedikit mengorbit lalu kembali ke posisi sempurna
        const sweepTheta = categoryName === 'support' ? (cam.theta + 0.35) : (cam.theta - 0.35);
        const camEnd = {
            theta: sweepTheta,
            phi: 0.01,
            radius: calculateFitRadius(),
            targetX: 0,
            targetY: 0,
            targetZ: 0
        };

        transition(camStart, camEnd, startHeights, endHeights, 600, true);

        // Render ulang marker tombol pin dengan animasi pop-in berurutan
        createSiteMarkers();
    };

    function createSiteMarkers() {
        overlay.innerHTML = '';
        markerElements.length = 0;
        infoCardElement = null;

        // Filter site points sesuai kategori aktif
        const filteredPresets = presets.filter(preset => {
            const itemClass = (preset.class || 'produksi').toLowerCase();
            return itemClass === currentCategory.toLowerCase();
        });

        filteredPresets.forEach((preset, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-marker-card';
            btn.id = `btn-${preset.id}`;
            btn.style.setProperty('--active-color', preset.color || '#38bdf8');
            // Stagger delay kemunculan pin
            btn.style.animationDelay = `${index * 45}ms`;

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

        // 1. LAYER DASAR: Lantai Background Gambar Peta SVG Sesuai Skala & Offset Kalibrasi
        const textureLoader = new THREE.TextureLoader();
        const mapTexture = textureLoader.load(theme.bgTexture || 'drawing-1.svg');
        mapTexture.generateMipmaps = true;
        mapTexture.minFilter = THREE.LinearMipmapLinearFilter;

        const bgW = MAP_W * (gConf.bgScaleX || 1.0);
        const bgD = MAP_D * (gConf.bgScaleY || 1.0);
        const offX = gConf.bgOffsetX || 0.0;
        const offZ = gConf.bgOffsetY || 0.0;

        floor = new THREE.Mesh(
            new THREE.PlaneGeometry(bgW, bgD),
            new THREE.MeshBasicMaterial({
                map: mapTexture,
                transparent: true,
                opacity: 0.95
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(offX, 0.0, offZ);
        floor.receiveShadow = false;
        scene.add(floor);

        // 2. LAYER TENGAH: Garis Grid Outline Tipis (0.5px subtle blueprint)
        if (theme.showGridLines !== false) {
            const gridHelper = new THREE.GridHelper(Math.max(MAP_W, MAP_D), Math.max(COLS, ROWS), theme.gridPrimary || 0x1e5a78, theme.gridSecondary || 0x113347);
            gridHelper.scale.set(MAP_W / Math.max(MAP_W, MAP_D), 1, MAP_D / Math.max(MAP_W, MAP_D));
            gridHelper.position.y = 0.005;
            if (gridHelper.material) {
                gridHelper.material.transparent = true;
                gridHelper.material.opacity = theme.gridOpacity !== undefined ? theme.gridOpacity : 0.45;
            }
            scene.add(gridHelper);
        }

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

        // Mulai dari kondisi flat 2D dengan warna yang terdefinisi
        applyStaticAndPresetCells(heights, null);
        for (let i = 0; i < COUNT; i++) {
            setInstance(i, FLAT_H);
        }
        cells.instanceMatrix.needsUpdate = true;
        cells.instanceColor.needsUpdate = true;
        scene.add(cells);

        updateCamera();
        attachControls();
        createSiteMarkers();

        window.addEventListener('resize', onResize);
        animate();

        // 🎬 ANIMASI INTRO BERURUTAN SATU PERSATU KELILING DINDING:
        setTimeout(() => {
            const startH = new Float32Array(COUNT).fill(FLAT_H);
            const targetH = new Float32Array(COUNT);
            applyStaticAndPresetCells(targetH, null);

            const camStart = {
                theta: 0,
                phi: 0.01,
                radius: calculateFitRadius() * 1.05,
                targetX: 0,
                targetY: 0,
                targetZ: 0
            };
            const camEnd = {
                theta: 0,
                phi: 0.01,
                radius: calculateFitRadius(),
                targetX: 0,
                targetY: 0,
                targetZ: 0
            };

            transition(camStart, camEnd, startH, targetH, 1400, false, true);
        }, 100);
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

        renderInfoCard(preset);

        transition(camStart, camEnd, startHeights, endHeights, 950, false);
    }

    function reset2D() {
        isFlat = true;
        currentPresetId = null;
        setActiveMarker(null);
        hideInfoCard();

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

        transition(camStart, camEnd, startHeights, endHeights, 650, true);
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
       9. ENGINE TRANSISI & ANIMASI BERTINGKAT (Staggered Organic Animation Engine)
       ============================================================ */
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Delay offsets acak terdistribusi agar sel-sel chart naik secara bertahap dalam kelompok acak
    const cellDelays = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
        // Kelompok acak terdistribusi antara 0.0 s/d 0.35
        cellDelays[i] = (Math.sin(i * 12.9898 + (i % COLS) * 78.233) * 0.5 + 0.5) * 0.35;
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
            updateMarkerPositions();

            for (let i = 0; i < COUNT; i++) {
                const sH = startHeights[i];
                const eH = endHeights[i];

                if (Math.abs(eH - sH) < 0.001) {
                    continue;
                }

                let localProgress;
                if (isReset) {
                    localProgress = k;
                } else if (isSequentialPerimeter) {
                    // Animasi berurutan mengalir keliling (top-left -> top-right -> right-down -> bottom-left -> left-up)
                    const { col, row } = indexToCell(i);
                    // Hitung urutan perimeter normalisasi 0 s/d 1
                    let order = 0;
                    if (row >= 60) {
                        order = (col / COLS) * 0.35; // Dinding Atas
                    } else if (col >= 90) {
                        order = 0.35 + ((ROWS - row) / ROWS) * 0.35; // Dinding Kanan
                    } else if (row <= 10) {
                        order = 0.70 + ((COLS - col) / COLS) * 0.20; // Dinding Bawah
                    } else {
                        order = 0.90 + (row / ROWS) * 0.10; // Dinding Kiri
                    }

                    const activeWindow = 0.45;
                    const startTime = order * 0.55;
                    const cellT = Math.max(0, Math.min(1, (t - startTime) / activeWindow));
                    localProgress = ease(cellT);
                } else {
                    // Saat klik site: naik bertahap dengan random cluster delay
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

    /* ============================================================
       11. LOGIKA KEAMANAN AKSES (Passcode PIN Verification)
       ============================================================ */
    // Default PIN: "2026" atau ganti sesuai keinginan Anda
    const ACCESS_PIN = "ck32026";

    window.verifyPin = function () {
        const input = document.getElementById('pin-input');
        const error = document.getElementById('lock-error-msg');
        const lockScreen = document.getElementById('auth-lock-screen');

        if (input && input.value.trim() === ACCESS_PIN) {
            sessionStorage.setItem('cp3_auth_unlocked', 'true');
            lockScreen.classList.add('unlocked');
            if (error) error.classList.remove('show');
        } else {
            if (error) error.classList.add('show');
            if (input) {
                input.value = '';
                input.focus();
            }
        }
    };

    // Auto-unlock jika dalam satu sesi browser sudah pernah memasukkan PIN
    if (sessionStorage.getItem('cp3_auth_unlocked') === 'true') {
        const lockScreen = document.getElementById('auth-lock-screen');
        if (lockScreen) lockScreen.classList.add('unlocked');
    }

    init();
})();
