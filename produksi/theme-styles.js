/* ============================================================
   PENGATURAN TEMA & GAYA VISUAL 3D (3D Visual & Theme Styles)
   - Warna latar, warna grid, material, dan pencahayaan
   ============================================================ */
const mapTheme = {
    // Warna Latar & Kanvas (Background & Floor)
    sceneBg: 0x07111b,
    floorColor: 0xffffff,
    bgTexture: 'drawing-1.svg', // Gambar peta latar (SVG)

    // Pengaturan Garis Grid Wireframe (Tipis 0.5px Subtle Blueprint Grid)
    showGridLines: true,
    gridPrimary: 0x1e5a78,
    gridSecondary: 0x113347,
    gridOpacity: 0.45,

    // Jarak Gap Antar Balok Sel (0.94 = Gap Sangat Tipis / Hairline Seam, tetap jelas terlihat batas per sel)
    cellGapFactor: 0.94,

    // Material Sel Blok (Cell Material Properties)
    cellRoughness: 0.5,
    cellMetalness: 0.03,
    cellOpacity3D: 0.9,
    cellOpacity2D: 0.0,

    // Pencahayaan (Lighting Config)
    hemiLight: { sky: 0xaeeaff, ground: 0x07111b, intensity: 0.85 },
    dirLight: { color: 0xffffff, intensity: 0.9, pos: [50, 100, 40] }
};

// Expose ke global window
window.mapTheme = mapTheme;
