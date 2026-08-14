
// 1. TITIK STATIS PERMANEN (Static Base Cells - Garis Dinding Border Arsitektur)
// Rekomendasi Warna Elegan:
// - Blueprint Cyan: "#38bdf8" (Terang & Bersih)
// - Slate Neon Blue: "#2563eb" (Solid & Elegan)
// - Muted Steel: "#475569" (Minimalis Arsitektural)
const staticCells = [
    { fromRow: 66, toRow: 66, fromCol: 1, toCol: 99, height: 2.2, color: "#38bdf8" },
    { fromRow: 5, toRow: 5, fromCol: 1, toCol: 99, height: 2.2, color: "#38bdf8" },
    { fromRow: 5, toRow: 66, fromCol: 1, toCol: 1, height: 2.2, color: "#38bdf8" },
    { fromRow: 5, toRow: 66, fromCol: 99, toCol: 99, height: 2.2, color: "#38bdf8" }
];

/* 2. PRESET TOMBOL SITE & BAR DINAMIS (Interactive Site Points)
   - Setiap site memiliki:
     * id, name, class, color, pin
     * cells: bar chart 3D
     * card: Kartu informasi / statistik dinamis yang muncul di layer 2 saat diklik
       - position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
       - title, subtitle, metrics: [{ label, value, color }], info
*/
const sitePoints = [
    {
        id: "whfg",
        name: "WHFG",
        class: "produksi",
        color: "#38bdf8", // Sky Cyan
        pin: { row: 20, col: 12 },
        card: {
            title: "Warehouse Finished Goods (WHFG)",
            subtitle: "Penyimpanan Produk Jadi",
            position: "top-left",
            metrics: [
                { label: "Kapasitas Pallet", value: "1,250", color: "#38bdf8" },
                { label: "Suhu Ruangan", value: "-18 °C", color: "#06b6d4" },
                { label: "Status Muat", value: "85%", color: "#10b981" }
            ],
            info: "Area cold storage untuk produk siap kirim ke logistik."
        },
        cells: [
            { fromRow: 8, toRow: 63, fromCol: 6, toCol: 18, height: 8, color: "#0284c7" },    // Deep Sky Blue
            { fromRow: 18, toRow: 35, fromCol: 17, toCol: 18, height: 5, color: "#38bdf8" },  // Vibrant Cyan
            { fromRow: 45, toRow: 50, fromCol: 17, toCol: 18, height: 5, color: "#7dd3fc" }   // Light Cyan
        ]
    },
    {
        id: "MDCW&SP",
        name: "MDCW&SP",
        class: "produksi",
        color: "#6366f1", // Indigo Accent
        pin: { row: 30, col: 24 },
        card: {
            title: "MDCW & Spareparts",
            subtitle: "Maintenance & Material Aisle",
            position: "top-left",
            metrics: [
                { label: "Jumlah Rak", value: "18 Aisle", color: "#6366f1" },
                { label: "Ketersediaan", value: "94.2%", color: "#10b981" },
                { label: "Part Kritis", value: "3 Item", color: "#f97316" }
            ],
            info: "Gudang suku cadang dan material support lini produksi."
        },
        cells: [
            { fromRow: 14, toRow: 14, fromCol: 21, toCol: 22, height: 5, color: "#f97316" }, // Bright Orange
            { fromRow: 14, toRow: 14, fromCol: 24, toCol: 25, height: 5, color: "#10b981" }, // Emerald Green
            { fromRow: 20, toRow: 20, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 20, toRow: 20, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 25, toRow: 25, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 25, toRow: 25, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 31, toRow: 31, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 31, toRow: 31, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 38, toRow: 38, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 38, toRow: 38, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 43, toRow: 43, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 43, toRow: 43, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 48, toRow: 48, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 48, toRow: 48, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 53, toRow: 53, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 53, toRow: 53, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
            { fromRow: 58, toRow: 58, fromCol: 21, toCol: 22, height: 5, color: "#f97316" },
            { fromRow: 58, toRow: 58, fromCol: 24, toCol: 25, height: 5, color: "#10b981" }
        ]
    },
    {
        id: "IQF",
        name: "IQF",
        class: "produksi",
        color: "#06b6d4", // Ice Cyan
        pin: { row: 39, col: 35 },
        card: {
            title: "Individual Quick Freezing (IQF)",
            subtitle: "Zona Pembekuan Cepat",
            position: "top-left",
            metrics: [
                { label: "Suhu Pembekuan", value: "-35 °C", color: "#06b6d4" },
                { label: "Kapasitas Belt", value: "2.5 Ton/h", color: "#38bdf8" },
                { label: "Efisiensi", value: "98%", color: "#10b981" }
            ],
            info: "Tunnel pembekuan instan untuk mempertahankan kualitas dan tekstur produk."
        },
        cells: [
            { fromRow: 58, toRow: 61, fromCol: 28, toCol: 39, height: 8, color: "#0891b2" }, // Freezing Cyan
            { fromRow: 53, toRow: 56, fromCol: 28, toCol: 39, height: 8, color: "#06b6d4" },
            { fromRow: 47, toRow: 51, fromCol: 28, toCol: 34, height: 8, color: "#22d3ee" },
            { fromRow: 19, toRow: 22, fromCol: 32, toCol: 41, height: 8, color: "#0e7490" },
            { fromRow: 13, toRow: 17, fromCol: 32, toCol: 40, height: 8, color: "#0891b2" },
            { fromRow: 24, toRow: 28, fromCol: 28, toCol: 34, height: 8, color: "#06b6d4" },
            { fromRow: 30, toRow: 34, fromCol: 28, toCol: 39, height: 8, color: "#22d3ee" },
            { fromRow: 36, toRow: 40, fromCol: 28, toCol: 39, height: 8, color: "#0891b2" },
            { fromRow: 42, toRow: 45, fromCol: 28, toCol: 34, height: 8, color: "#0e7490" }
        ]
    },
    {
        id: "PC",
        name: "PC",
        class: "produksi",
        color: "#ec4899", // Rose Pink
        pin: { row: 17, col: 30 },
        card: {
            title: "Preparation Center (PC)",
            subtitle: "Persiapan Bahan Baku",
            position: "top-left",
            metrics: [
                { label: "Batch Aktif", value: "6 Batch", color: "#ec4899" },
                { label: "QC Pass", value: "100%", color: "#10b981" }
            ],
            info: "Area preparasi dan penimbangan komposisi sebelum proses pencampuran."
        },
        cells: [
            { fromRow: 14, toRow: 14, fromCol: 27, toCol: 30, height: 8, color: "#f43f5e" }, // Rose Red
            { fromRow: 20, toRow: 20, fromCol: 27, toCol: 30, height: 8, color: "#fb7185" }  // Light Rose
        ]
    },
    {
        id: "Uk Line",
        name: "Uk Line",
        class: "produksi",
        color: "#8b5cf6", // Purple Violet
        pin: { row: 14, col: 60 },
        card: {
            title: "UK Processing Line",
            subtitle: "Lini Pengolahan UK",
            position: "top-left",
            metrics: [
                { label: "Speed Line", value: "120 pcs/m", color: "#8b5cf6" },
                { label: "OEE Target", value: "88%", color: "#10b981" }
            ],
            info: "Lini continuous processing dan cooking untuk varian produk UK."
        },
        cells: [
            { fromRow: 14, toRow: 14, fromCol: 45, toCol: 64, height: 8, color: "#7c3aed" }, // Deep Violet
            { fromRow: 14, toRow: 14, fromCol: 50, toCol: 64, height: 8, color: "#a78bfa" }  // Soft Violet
        ]
    },
    {
        id: "DM Line",
        name: "DM Line",
        class: "produksi",
        color: "#a855f7", // Bright Purple
        pin: { row: 20, col: 60 },
        card: {
            title: "DM Processing Line",
            subtitle: "Lini Pengolahan DM",
            position: "top-left",
            metrics: [
                { label: "Output Hari Ini", value: "4,200 kg", color: "#a855f7" },
                { label: "Efisiensi", value: "91%", color: "#10b981" }
            ],
            info: "Lini otomatis pengolahan dan pencetakan adonan DM."
        },
        cells: [
            { fromRow: 20, toRow: 20, fromCol: 50, toCol: 65, height: 8, color: "#9333ea" },
            { fromRow: 20, toRow: 20, fromCol: 42, toCol: 49, height: 8, color: "#c084fc" }
        ]
    },
    {
        id: "AN Line",
        name: "AN Line",
        class: "produksi",
        color: "#d946ef", // Fuchsia
        pin: { row: 26, col: 40 },
        card: {
            title: "AN Processing Line",
            subtitle: "Lini Pengolahan AN",
            position: "top-left",
            metrics: [
                { label: "Status Mesin", value: "Running", color: "#10b981" },
                { label: "Kecepatan", value: "95 m/min", color: "#d946ef" }
            ],
            info: "Lini produksi conveyor berkecepatan tinggi varian AN."
        },
        cells: [
            { fromRow: 25, toRow: 25, fromCol: 35, toCol: 64, height: 8, color: "#c026d3" }
        ]
    },
    {
        id: "Mie Line",
        name: "Mie Line",
        class: "produksi",
        color: "#eab308", // Golden Yellow
        pin: { row: 56, col: 60 },
        card: {
            title: "Noodle Processing Line",
            subtitle: "Lini Pembuatan Mie",
            position: "top-left",
            metrics: [
                { label: "Kapasitas Adonan", value: "3.2 Ton", color: "#eab308" },
                { label: "Suhu Steamer", value: "98 °C", color: "#f97316" },
                { label: "Kadar Air", value: "11.5%", color: "#10b981" }
            ],
            info: "Proses steaming, pemotongan, dan pengeringan mie instan/basah."
        },
        cells: [
            { fromRow: 51, toRow: 60, fromCol: 59, toCol: 66, height: 7, color: "#ca8a04" }, // Rich Gold
            { fromRow: 50, toRow: 60, fromCol: 62, toCol: 66, height: 10, color: "#facc15" } // Bright Yellow
        ]
    },
    {
        id: "Mixing",
        name: "Mixing",
        class: "produksi",
        color: "#14b8a6", // Teal Aqua
        pin: { row: 14, col: 76 },
        card: {
            title: "Industrial Mixing Room",
            subtitle: "Ruang Pencampuran",
            position: "top-left",
            metrics: [
                { label: "Mixer Aktif", value: "4 Unit", color: "#14b8a6" },
                { label: "Keseragaman", value: "99.4%", color: "#10b981" }
            ],
            info: "Pencampuran bumbu dan formula cair secara presisi dan higienis."
        },
        cells: [
            { fromRow: 9, toRow: 22, fromCol: 70, toCol: 80, height: 8, color: "#0d9488" }   // Deep Teal
        ]
    },
    {
        id: "Chilled",
        name: "Chilled",
        class: "produksi",
        color: "#3b82f6", // Cool Blue
        pin: { row: 28, col: 76 },
        card: {
            title: "Chilled Storage Room",
            subtitle: "Penyimpanan Dingin",
            position: "top-left",
            metrics: [
                { label: "Suhu Target", value: "2 - 4 °C", color: "#3b82f6" },
                { label: "Humidity", value: "65%", color: "#06b6d4" }
            ],
            info: "Ruang pendingin intermediate untuk bahan setengah jadi."
        },
        cells: [
            { fromRow: 23, toRow: 35, fromCol: 70, toCol: 80, height: 8, color: "#2563eb" }  // Chilled Royal Blue
        ]
    },
    {
        id: "Hot Room",
        name: "Hot Room",
        class: "produksi",
        color: "#ef4444", // Flame Red
        pin: { row: 38, col: 75 },
        card: {
            title: "Thermal / Hot Room",
            subtitle: "Ruang Inkubasi & Suhu Tinggi",
            position: "top-left",
            metrics: [
                { label: "Suhu Ruangan", value: "45 °C", color: "#ef4444" },
                { label: "Sirkulasi Udara", value: "Optimal", color: "#10b981" }
            ],
            info: "Area proses termal terkontrol untuk pematangan dan inkubasi."
        },
        cells: [
            { fromRow: 36, toRow: 42, fromCol: 70, toCol: 80, height: 8, color: "#dc2626" }   // Deep Hot Red
        ]
    },
    {
        id: "WHRM",
        name: "WHRM",
        class: "produksi",
        color: "#f97316", // Warm Amber Orange
        pin: { row: 14, col: 88 },
        card: {
            title: "Warehouse Raw Material (WHRM)",
            subtitle: "Gudang Bahan Baku Utama",
            position: "top-left",
            metrics: [
                { label: "Total Stok", value: "450 Ton", color: "#f97316" },
                { label: "Tingkat Okupansi", value: "78%", color: "#10b981" },
                { label: "Incoming Hari Ini", value: "12 Truk", color: "#38bdf8" }
            ],
            info: "Penerimaan, penyimpanan, dan inspeksi awal seluruh bahan baku."
        },
        cells: [
            { fromRow: 8, toRow: 63, fromCol: 84, toCol: 94, height: 8, color: "#ea580c" },  // Burnt Amber
        ]
    },

    /* ============================================================
       KATEGORI 2: SUPPORT PRODUKSI (Utility, Maintenance, QC, dll)
       ============================================================ */
    {
        id: "boiler",
        name: "Utility & Boiler",
        class: "support",
        color: "#f43f5e", // Rose Red
        pin: { row: 60, col: 85 },
        card: {
            title: "Utility & Steam Boiler Station",
            subtitle: "Pusat Energi & Steam Produksi",
            position: "top-left",
            metrics: [
                { label: "Tekanan Steam", value: "8.5 Bar", color: "#f43f5e" },
                { label: "Beban Listrik", value: "850 kW", color: "#f59e0b" },
                { label: "Efisiensi Boiler", value: "96%", color: "#10b981" }
            ],
            info: "Penyuplai uap panas (steam), kompresor udara, dan listrik utama pabrik."
        },
        cells: [
            { fromRow: 56, toRow: 64, fromCol: 82, toCol: 92, height: 10, color: "#e11d48" },
            { fromRow: 58, toRow: 62, fromCol: 85, toCol: 90, height: 14, color: "#fb7185" }
        ]
    },
    {
        id: "workshop",
        name: "Workshop & MTC",
        class: "support",
        color: "#8b5cf6", // Violet
        pin: { row: 40, col: 12 },
        card: {
            title: "Workshop Engineering & Maintenance",
            subtitle: "Bengkel Perawatan Mesin",
            position: "top-left",
            metrics: [
                { label: "Teknisi Standby", value: "8 Orang", color: "#8b5cf6" },
                { label: "Preventive Task", value: "12 / 12", color: "#10b981" },
                { label: "Status Respon", value: "< 5 Min", color: "#38bdf8" }
            ],
            info: "Area fabrikasi, perbaikan cepat, dan kalibrasi peralatan mekanik & elektrik."
        },
        cells: [
            { fromRow: 36, toRow: 44, fromCol: 6, toCol: 16, height: 8, color: "#7c3aed" }
        ]
    },
    {
        id: "qclab",
        name: "QC & QA Lab",
        class: "support",
        color: "#10b981", // Emerald Green
        pin: { row: 14, col: 35 },
        card: {
            title: "Quality Control & Assurance Lab",
            subtitle: "Laboratorium Pengujian Mutu",
            position: "top-left",
            metrics: [
                { label: "Uji Mikrobiologi", value: "Clean", color: "#10b981" },
                { label: "Sample Batch", value: "24 Sample", color: "#38bdf8" },
                { label: "Akurasi Uji", value: "99.9%", color: "#10b981" }
            ],
            info: "Pengujian organoleptik, kimia, dan mikrobiologi bahan baku hingga produk jadi."
        },
        cells: [
            { fromRow: 9, toRow: 17, fromCol: 32, toCol: 42, height: 8, color: "#059669" }
        ]
    }
];

// Expose ke global window
window.staticCells = staticCells;
window.sitePoints = sitePoints;
window.chartPresets = sitePoints;
