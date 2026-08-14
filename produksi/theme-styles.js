/* ============================================================
   PENGATURAN TEMA & GAYA VISUAL 3D (3D Visual & Theme Styles)
   - Warna latar, warna grid, material, dan pencahayaan
   ============================================================ */
const mapTheme = {
    // Warna Latar & Kanvas (Deep Black-Navy Cyber Aesthetic)
    sceneBg: 0x020611,
    floorColor: 0xffffff,
    bgTexture: 'drawing-1.svg', // Gambar peta latar (SVG)

    // Pengaturan Garis Grid Wireframe (Garis Biru Neon Menyala Halus)
    showGridLines: true,
    gridPrimary: 0x1d4ed8, // Electric Deep Blue
    gridSecondary: 0x0f2347, // Midnight Navy
    gridOpacity: 0.40,

    // Jarak Gap Antar Balok Sel (0.94 = Gap Sangat Tipis / Hairline Seam)
    cellGapFactor: 0.94,

    // Material Sel Blok (Glossy Crystal Coating dengan Kilau Atas)
    cellRoughness: 0.18,
    cellMetalness: 0.40,
    cellOpacity3D: 0.95,
    cellOpacity2D: 0.0,

    // Pencahayaan Sinematik Neon (Glowing Cyan Sky & Deep Navy Floor)
    hemiLight: { sky: 0x60a5fa, ground: 0x020611, intensity: 1.05 },
    dirLight: { color: 0x93c5fd, intensity: 1.15, pos: [60, 120, 50] }
};

// Expose ke global window
window.mapTheme = mapTheme;
