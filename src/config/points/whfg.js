export const whfg = {
    id: "whfg",
    name: "WHFG",
    class: "produksi",
    color: "#38bdf8",
    pin: { row: 20, col: 12 },
    card: {
        title: "Warehouse Finished Goods (WHFG)",
        subtitle: "Gudang & Manajemen Stok Produk Jadi",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#38bdf8",
                info: `Produk yang masuk WHFG dari SP langsung di-scan dan dicatat posisi raknya lewat Apps Inbound WHFG. Tidak ada pencatatan di kertas, tidak ada yang perlu diingat-ingat.
<br>
<b style='color:#38bdf8'>Yang terjadi saat produk masuk:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Operator scan Barcode Secondary dari SP, input lokasi rak dan tanggal masuk — langsung tersimpan ke sistem.</li>
    <li>Data lokasi rak, tanggal masuk, dan batch produk langsung terekam digital, FIFO otomatis terjaga tanpa perlu rekap ulang.</li>
</ul>
<b style='color:#f97316'>Posisi Apps WHFG ini:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Bukan pengganti sistem WMS yang sudah ada — hadir sebagai pembanding atau bisa langsung diintegrasikan dengan sistem existing kalau memungkinkan.</li>
    <li>Cross-check data stok antara sistem existing dan input operator jadi mudah dilakukan kapan saja.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang langsung terasa:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Posisi rak setiap dus tercatat digital — cari produk siap kirim tinggal lihat sistem, tidak perlu jalan ke seluruh gudang.</li>
    <li>FIFO terjaga otomatis — early warning kalau ada produk yang sudah lama di gudang dan mendekati expiry, sebelum jadi masalah retur.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>PPIC:</b> Kapasitas gudang real-time — bisa tentukan kapan produksi shift berikutnya aman mulai tanpa khawatir gudang overflow.</li>
    <li><b>Finance:</b> Stok terdokumentasi akurat, tidak ada lagi kejutan saat stock opname karena ada selisih yang tidak jelas asalnya.</li>
    <li><b>Logistik:</b> Lokasi rak langsung kelihatan di sistem saat order masuk — outbound lebih cepat, tidak ada waktu terbuang buat cari barang.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Scan → pilih rak → simpan. Selesai. Tidak ada lagi tulis di kertas yang kemudian harus direkap lagi ke spreadsheet.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 8, toRow: 63, fromCol: 6, toCol: 18, height: 6, color: "#0284c7" },
        { fromRow: 18, toRow: 35, fromCol: 17, toCol: 18, height: 4, color: "#38bdf8" },
        { fromRow: 45, toRow: 50, fromCol: 17, toCol: 18, height: 5, color: "#7dd3fc" }
    ]
};
