
// 1. TITIK STATIS PERMANEN (Static Base Cells)
const staticCells = [
    { fromRow: 66, toRow: 66, fromCol: 1, toCol: 99, height: 3, color: "#0249f2" },
    { fromRow: 5, toRow: 5, fromCol: 1, toCol: 99, height: 3, color: "#0249f2" },
    { fromRow: 5, toRow: 66, fromCol: 1, toCol: 1, height: 3, color: "#0249f2" },
    { fromRow: 5, toRow: 66, fromCol: 99, toCol: 99, height: 3, color: "#0249f2" }
];

/* 2. PRESET TOMBOL SITE & BAR DINAMIS (Interactive Site Points)
   - Muncul saat tombol bulat/card diklik */
const sitePoints = [
    {
        id: "whfg",
        name: "WHFG",
        color: "#38bdf8",
        pin: { row: 20, col: 12 },
        cells: [
            { fromRow: 8, toRow: 63, fromCol: 6, toCol: 18, height: 8, color: "#f2020d" },
            { fromRow: 18, toRow: 35, fromCol: 17, toCol: 18, height: 5, color: "#ddf469" },
            { fromRow: 45, toRow: 50, fromCol: 17, toCol: 18, height: 5, color: "#ddf469" }
        ]
    },
    {
        id: "MDCW&SP",
        name: "MDCW&SP",
        color: "#0249f2",
        pin: { row: 30, col: 26 },
        cells: [
            { fromRow: 14, toRow: 14, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 14, toRow: 14, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 20, toRow: 20, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 20, toRow: 20, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 25, toRow: 25, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 25, toRow: 25, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 31, toRow: 31, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 31, toRow: 31, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 38, toRow: 38, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 38, toRow: 38, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 43, toRow: 43, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 43, toRow: 43, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 48, toRow: 48, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 48, toRow: 48, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 53, toRow: 53, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 53, toRow: 53, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" },
            { fromRow: 58, toRow: 58, fromCol: 21, toCol: 22, height: 5, color: "#ff8e00" },
            { fromRow: 58, toRow: 58, fromCol: 24, toCol: 25, height: 5, color: "#00ff4c" }
        ]
    },
    {
        id: "site-c",
        name: "Site C",
        color: "#f59e0b",
        pin: { row: 70, col: 70 },
        cells: [
            { row: 70, col: 70, height: 22, color: "#f59e0b" },
            { row: 70, col: 71, height: 18, color: "#fbbf24" },
            { row: 71, col: 70, height: 14, color: "#d97706" }
        ]
    }
];

// Expose ke global window
window.staticCells = staticCells;
window.sitePoints = sitePoints;
window.chartPresets = sitePoints;
