/* ============================================================
   PENGATURAN TEMA & GAYA VISUAL 3D (3D Visual & Theme Styles)
   - Warna latar, warna grid, material, dan pencahayaan
   ============================================================ */
const mapTheme = {
    // Warna Latar & Kanvas (Background & Floor)
    sceneBg: 0x07111b,
    floorColor: 0xffffff,
    bgTexture: 'drawing-1.svg', // Gambar peta latar (SVG)

    // Warna Garis Outline Grid (Wireframe Grid Helper)
    gridPrimary: 0x1e5a78,
    gridSecondary: 0x143c52,

    // Warna Blok Sel Dasar (Base Cell Color)
    cellBaseColor: 0x2e8cad,

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
