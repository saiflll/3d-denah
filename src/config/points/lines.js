export const pc = {
    id: "PC",
    name: "PC",
    class: "produksi",
    color: "#ec4899",
    pin: { row: 17, col: 30 },
    card: {
        title: "Packing & Preparation Center (PC)",
        subtitle: "Stasiun Penimbangan & Cetak QR Primary",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#ec4899",
                info: `Stasiun penimbangan dan pengemasan produk (khusus UK Line dan Dimsum Line setelah melewati proses pembekuan di IQF).
<b>Alur Sistem & Cetak QR Code Primary:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Alur Masuk (Pre-PC):</b> Produk UK & Dimsum dibekukan terlebih dahulu di <i>IQF Tunnel Freezer</i> sebelum masuk ke stasiun PC.</li>
    <li><b>Penimbangan & Cetak QR Primary:</b> Di stasiun PC, produk ditimbang berat akhirnya dan dilakukan <b>Pencetakan Primary QR Code</b> pada kemasan primer.</li>
    <li><b>Alur Keluar (Post-PC):</b> Setelah dicetak QR Code Primary, produk dikirim ke <b>MDCW</b> (Master Distribution / Storage) untuk manajemen rak & alokasi stok.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>1. Dampak Bisnis & Traceability:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Penguncian data produk via Primary QR Code menjamin 100% <i>traceability</i> kemasan primer hingga ke gudang penyimpanan MDCW.</li>
    <li>Menghilangkan kesalahan identifikasi produk atau pencampuran batch sebelum masuk ke MDCW.</li>
</ul>
<b>2. Dampak Lintas Divisi (Produksi, QC & Warehouse MDCW):</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Validasi & Akurasi Data:</b> Data penimbangan PC dan data cetak QR Code terkoneksi langsung dengan sistem pencatatan di MDCW.</li>
    <li><b>QC Verification:</b> Produk yang tidak memenuhi standar berat di PC akan otomatis tertolak sebelum dicetak QR Code.</li>
</ul>
<b>3. Kemudahan Operator:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Pencetakan QR Code Primary terotomatisasi dari hasil timbang PC mempercepat alur penanganan barang ke MDCW.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 14, toRow: 14, fromCol: 27, toCol: 30, height: 8, color: "#f43f5e" },
        { fromRow: 20, toRow: 20, fromCol: 27, toCol: 30, height: 8, color: "#fb7185" }
    ]
};

export const ukLine = {
    id: "Uk Line",
    name: "Uk Line",
    class: "produksi",
    color: "#8b5cf6",
    pin: { row: 14, col: 60 },
    card: {
        title: "UK Processing Line",
        subtitle: "Lini Pengolahan Continuous UK",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#8b5cf6",
                info: `Pengawasan dan pemantauan laju kecepatan lini pencetakan serta pemrosesan <i>continuous</i> UK Line. Skema flow proses yang diajukan disajikan di bawah ini:
<img src='/uk.png' alt='UK Line Process Flow' style='max-width:100%;margin:8px 0;border-radius:6px;' />
Melalui flow proses ini, sistem pemantauan dashboard memvisualisasikan parameter input bahan & output produksi secara real-time:
<img src='/ukdas.png' alt='UK Line Expected Dashboard' style='max-width:100%;margin:8px 0;border-radius:6px;' />
<b>Alur Integrasi Lini UK:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Lini UK $\rightarrow$ IQF:</b> Produk olahan diproses dan dibekukan di <i>IQF Tunnel Freezer</i> (pemantauan PZEM & Proximity In/Out).</li>
    <li><b>IQF $\rightarrow$ Stasiun PC:</b> Produk terbeku ditimbang & dicetak <b>Primary QR Code</b> di Stasiun PC.</li>
    <li><b>Stasiun PC $\rightarrow$ MDCW:</b> Produk ber-QR Code dikirim ke MDCW untuk alokasi penyimpanan.</li>
</ul>
<b>Parameter Dashboard & Telemetri UK Line:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Input Bahan & Konsumsi Daya:</b> Adonan (kg), Keju (kg), Minyak (kg), & Electrical Cost (kWh).</li>
    <li><b>Output Rate Monitoring:</b> After Forming, After Frying, After Check (pcs/min), hingga Timbang & Primary QR di PC.</li>
</ul>
<b>Kebutuhan Sensor & Integrasi Data:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li><b>Proximity Non-Metal / Hall Sensor (Food Grade):</b> Pencacahan fisik produk di tiap tahap.</li>
    <li><b>PZEM Power Sensor:</b> Memantau konsumsi daya listrik (kWh & electrical cost) secara real-time.</li>
    <li><b>Data Comparison Multi-Source:</b> Membandingkan data sensor fisik dengan internal PLC (Forming & Frying) serta data penimbangan & QR PC.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>1. Dampak Bisnis & Efisiensi Bahan/Energi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Memantau pemakaian bahan baku (Adonan, Keju, Minyak dalam kg) vs. total output & hasil cetak QR Primary PC untuk penekanan <i>waste</i>.</li>
    <li>Korelasi konsumsi listrik (kWh) dengan kecepatan produksi per menit (pcs/min) untuk optimasi <i>electrical cost</i>.</li>
</ul>
<b>2. Dampak Lintas Divisi (Produksi, IQF, PC & MDCW):</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Traceability End-to-End:</b> Alur transparan dari Lini UK $\rightarrow$ Pembekuan IQF $\rightarrow$ Timbang & Cetak QR PC $\rightarrow$ Penyimpanan MDCW.</li>
    <li><b>Validasi & Akurasi (Cross-Check):</b> Data Proximity sensor vs. PLC Forming/Frying vs. hasil timbang & QR PC menjamin akurasi stok.</li>
</ul>
<b>3. Kemudahan Operator:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Dashboard terpadu menyajikan grafik kecepatan pcs/menit per tahap, konsumsi bahan, dan status energi secara transparan.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 14, toRow: 14, fromCol: 45, toCol: 64, height: 6, color: "#7c3aed" },
        { fromRow: 14, toRow: 14, fromCol: 50, toCol: 64, height: 9, color: "#a78bfa" }
    ]
};

export const dmLine = {
    id: "DM Line",
    name: "Dimsum Line",
    class: "produksi",
    color: "#a855f7",
    pin: { row: 20, col: 60 },
    card: {
        title: "Dimsum Processing Line",
        subtitle: "Lini Pengolahan Continuous Dimsum",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#a855f7",
                info: `Pengawasan dan pemantauan laju kecepatan lini pencetakan serta pemrosesan <i>continuous</i> Dimsum Line. Skema flow proses yang diajukan disajikan di bawah ini:
<img src='/dm.png' alt='Dimsum Line Process Flow' style='max-width:100%;margin:8px 0;border-radius:6px;' />
Melalui flow proses ini, sistem pemantauan dashboard memvisualisasikan parameter input bahan & output produksi secara real-time:
<img src='/dmdas.png' alt='Dimsum Line Expected Dashboard' style='max-width:100%;margin:8px 0;border-radius:6px;' />
<b>Alur Integrasi Lini Dimsum:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Lini Dimsum $\rightarrow$ IQF:</b> Produk dimsum dibekukan terlebih dahulu di <i>IQF Tunnel Freezer</i> (pemantauan PZEM & Proximity In/Out).</li>
    <li><b>IQF $\rightarrow$ Stasiun PC:</b> Produk terbeku ditimbang & dicetak <b>Primary QR Code</b> di Stasiun PC.</li>
    <li><b>Stasiun PC $\rightarrow$ MDCW:</b> Produk ber-QR Code dikirim ke MDCW untuk alokasi penyimpanan.</li>
</ul>
<b>Parameter Dashboard & Telemetri Dimsum Line:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Input Bahan & Konsumsi Daya:</b> Adonan Luar (kg), Adonan Isian (kg), & Electrical Cost (kWh) <i>(tanpa minyak)</i>.</li>
    <li><b>Output Rate Monitoring:</b> After Forming, After Check (pcs/min), hingga Timbang & Primary QR di PC.</li>
</ul>
<b>Kebutuhan Sensor & Integrasi Data:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li><b>Proximity Non-Metal / Hall Sensor (Food Grade):</b> Dipasang pada lini pengolahan dimsum untuk pencacahan fisik di tiap tahap.</li>
    <li><b>PZEM Power Sensor:</b> Memantau konsumsi daya listrik (kWh & electrical cost) secara real-time.</li>
    <li><b>Data Comparison Multi-Source:</b> Membandingkan data sensor fisik dengan internal PLC (Forming) serta data penimbangan & QR PC.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>1. Dampak Bisnis & Efisiensi Bahan/Energi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Memantau pemakaian bahan baku (Adonan Luar & Isian dalam kg) vs. total output & hasil cetak QR Primary PC untuk analisis efisiensi bahan.</li>
    <li>Korelasi konsumsi listrik (kWh) dengan kecepatan produksi per menit (pcs/min) untuk optimasi <i>electrical cost</i>.</li>
</ul>
<b>2. Dampak Lintas Divisi (Produksi, IQF, PC & MDCW):</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Traceability End-to-End:</b> Alur terhubung dari Lini Dimsum $\rightarrow$ Pembekuan IQF $\rightarrow$ Timbang & Cetak QR PC $\rightarrow$ Storage MDCW.</li>
    <li><b>Validasi & Akurasi (Cross-Check):</b> Data Proximity sensor vs. PLC Forming vs. timbang & QR PC menjamin akurasi stok output.</li>
</ul>
<b>3. Kemudahan Operator:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Dashboard terpadu menyajikan grafik kecepatan pcs/menit per tahap, konsumsi bahan baku, dan status energi secara transparan.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 20, toRow: 20, fromCol: 50, toCol: 65, height: 9, color: "#9333ea" },
        { fromRow: 20, toRow: 20, fromCol: 42, toCol: 49, height: 6, color: "#c084fc" }
    ]
};

export const anLine = {
    id: "AN Line",
    name: "AN Line (Acin)",
    class: "produksi",
    color: "#d946ef",
    pin: { row: 26, col: 40 },
    card: {
        title: "AN Processing Line (Acin)",
        subtitle: "Lini Pengolahan Acin (Timbang Manual)",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#d946ef",
                info: `Pengawasan dan pemantauan data digitalisasi lini pengolahan AN (Acin). Saat ini proses penimbangan di lini Acin masih dilakukan secara manual di lokasi.
<b>Skema Capture Data Timbangan:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Integration With Digital Scale:</b> Menangkap data berat produk secara otomatis dari indikator timbangan digital manual (via RS232 / Smart Weighing Interface).</li>
    <li><b>Menyesuaikan Alur Eksistensi:</b> Operator tetap melakukan timbang fisik seperti biasa, tetapi data hasil timbangan ditangkap langsung oleh sistem secara digital.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>1. Dampak Bisnis & Akurasi Data:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Pencatatan digital otomatis dari timbangan manual menghilangkan <i>human error</i> dan meminimalisir selisih data stok Acin.</li>
    <li>Akumulasi total berat output Acin tercatat presisi untuk analisis efisiensi batch.</li>
</ul>
<b>2. Dampak Lintas Divisi (Produksi, QC & Management):</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Traceability Real-Time:</b> Hasil penimbangan manual Acin langsung terhubung ke sistem pusat untuk kelanjutan proses ke gudang/packing.</li>
    <li><b>Laporan Otomatis:</b> Manajemen menerima rekap kuantitas produksi harian tanpa perlu mencatat ulang fisik kertas/nota.</li>
</ul>
<b>3. Kemudahan Operator:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Operator tidak perlu lagi menuliskan angka timbangan secara manual di lembar kerja, mempercepat alur kerja penimbangan Acin.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 25, toRow: 25, fromCol: 35, toCol: 64, height: 6, color: "#c026d3" }
    ]
};

export const mieLine = {
    id: "Mie Line",
    name: "Mie Line",
    class: "produksi",
    color: "#eab308",
    pin: { row: 56, col: 60 },
    card: {
        title: "Noodle Processing Line",
        subtitle: "Lini Pembuatan Mie (PLC Telemetry)",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#eab308",
                info: `Digitalisasi dan pengawasan otomatis Lini Pembuatan Mie berbasis <b>PLC Sniffing</b> secara real-time.
<br>
<b style='color:#eab308'>1. Parameter Terukur via PLC Sniffing:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Jam Running Mesin (Operational Hours):</b> Memantau durasi jam kerja aktif peralatan pengaduk dan konveyor pengolahan mie.</li>
    <li><b>Penggunaan Bahan Utama:</b>
        <ul style='margin-left:16px;margin-top:2px;'>
            <li>Konsumsi Tepung (kg) yang terpakai per batch/shift.</li>
            <li>Konsumsi Air (Liter / m³) yang diinjeksikan ke adonan.</li>
        </ul>
    </li>
</ul>
<b style='color:#10b981'>2. Log Action & Mode Operasi (Auto vs. Manual):</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li><b>Audit Log Action Operator:</b> Pencatatan otomatis riwayat aksi intervensi operator di mesin.</li>
    <li><b>Tracking Mode Operasi:</b> Merekam tanggal, jam, dan durasi saat mesin berjalan dalam <b>Auto Mode</b> serta menandai saat beralih ke <b>Manual Mode</b> beserta timestamp penyesuaiannya.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>1. Dampak Bisnis & Efisiensi Bahan/Utilitas:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Pemantauan rasio pemakaian Tepung (kg) dan Air (Liter) vs. hasil jadi adonan mie untuk evaluasi efisiensi formula dan penekanan <i>waste</i>.</li>
    <li>Menghitung efisiensi jam operasional mesin (Running Hours) terhadap output produksi.</li>
</ul>
<b>2. Dampak Lintas Divisi (Produksi, Maintenance & QC):</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Auditability & SOP Compliance:</b> Histori log <i>Auto vs. Manual Mode</i> memberikan visibilitas kepada tim QC dan Supervisor jika terjadi penyimpangan SOP operasional.</li>
    <li><b>Maintenance Berbasis Running Hours:</b> Tim Maintenance dapat menjadwalkan perawatan preventif berdasarkan akumulasi jam jalan mesin yang tercatat di PLC.</li>
</ul>
<b>3. Kemudahan Operator:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Seluruh data konsumsi bahan dan status mode mesin ditangkap otomatis tanpa memerlukan pencatatan logbook fisik di area produksi mie.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 51, toRow: 60, fromCol: 59, toCol: 66, height: 6, color: "#ca8a04" },
        { fromRow: 50, toRow: 60, fromCol: 62, toCol: 66, height: 10, color: "#facc15" }
    ]
};
