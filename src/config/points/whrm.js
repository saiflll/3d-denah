export const whrm = {
    id: "WHRM",
    name: "WHRM",
    class: "produksi",
    color: "#f97316",
    pin: { row: 14, col: 88 },
    card: {
        title: "Warehouse Raw Material (WHRM)",
        subtitle: "Gudang Bahan Baku Utama",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#f97316",
                info: `<a class='wx' href='https://github.com/ppa-project/PITSTOP-CP3-X-WH.git' target='_blank'>Digitalisasi Manajemen Bahan Baku (Raw Material)</a> lewat <a class='wx' href='https://rm.mithy.cfd' target='_blank'>Aplikasi DW (Digitalization Warehouse)</a> — pengelolaan gudang berbasis FIFO dengan timbangan otomatis dan notifikasi operasional langsung.
<img src='/dw.png' alt='DW Screenshot' style='max-width:100%;margin:8px 0;border-radius:6px;' />
<b>Posisi Aplikasi DW di Sini:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Bukan pengganti sistem existing:</b> Sistem IoT yang sudah ada belum bisa diintegrasikan langsung. DW App hadir sebagai pendamping — menerima input dari operator lapangan sambil menunggu integrasi penuh.</li>
    <li><b>Pembanding data:</b> Data otomasi existing dibandingkan dengan input manual operator, jadi ketahuan kalau ada yang tidak klop di lapangan.</li>
    <li><b>Perlu dedicated server:</b> Supaya akses data aman per role, cepat saat transaksi banyak, dan tidak terganggu aktivitas jaringan produksi yang lain.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang diuntungkan:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Purchasing:</b> Tahu kapan harus restock tanpa menebak — based on tren outbound aktual, bukan perkiraan konsumsi bulan lalu.</li>
    <li><b>Finance:</b> Cost pengadaan bisa dikontrol lebih ketat karena ada data aktual, bukan asumsi rata-rata.</li>
    <li><b>Produksi & QC:</b> Bahan baku selalu siap tepat waktu, traceability lot terjaga dari awal, downtime karena kehabisan stok bisa dikurangi.</li>
    <li><b>Management:</b> Stok inbound/outbound kelihatan real-time — tidak perlu nunggu laporan shift untuk tahu kondisi gudang.</li>
    <li><b>Operator Gudang:</b> Timbangan langsung catat otomatis, tidak perlu input ulang manual — lebih cepat, lebih sedikit salah.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 8, toRow: 63, fromCol: 84, toCol: 94, height: 6, color: "#ea580c" }
    ]
};
