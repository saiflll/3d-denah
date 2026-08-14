/* ============================================================
   PENGATURAN TEMA & GAYA VISUAL 3D (3D Visual & Theme Styles)
   - Warna latar, warna grid, material, dan pencahayaan
   ============================================================ */
const mapTheme = {
    // Warna Latar & Kanvas (Ultra Dark Slate Theme)
    sceneBg: 0x070c14,
    floorColor: 0xffffff,
    bgTexture: 'drawing-1.svg', // Gambar peta latar (SVG)

    // Pengaturan Garis Grid Wireframe (Tipis 0.5px Subtle Blueprint Grid)
    showGridLines: true,
    gridPrimary: 0x16384c,
    gridSecondary: 0x0d212d,
    gridOpacity: 0.35,

    // Jarak Gap Antar Balok Sel (0.94 = Gap Sangat Tipis / Hairline Seam)
    cellGapFactor: 0.94,

    // Material Sel Blok (Futuristic Matte Ceramic)
    cellRoughness: 0.35,
    cellMetalness: 0.12,
    cellOpacity3D: 0.95,
    cellOpacity2D: 0.0,

    // Pencahayaan Sinematik (Cinematic Soft Lighting)
    hemiLight: { sky: 0xc8eeff, ground: 0x070c14, intensity: 0.95 },
    dirLight: { color: 0xffffff, intensity: 1.1, pos: [60, 120, 50] }
};

// Expose ke global window
window.mapTheme = mapTheme;
