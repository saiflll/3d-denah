export const iqf = {
    id: "IQF",
    name: "IQF",
    class: "produksi",
    color: "#06b6d4",
    pin: { row: 39, col: 35 },
    card: {
        title: "Individual Quick Freezing (IQF)",
        subtitle: "Zona Pembekuan Cepat UK & Dimsum",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#06b6d4",
                info: `Sistem pemantauan IQF Tunnel Freezer untuk produk UK & Dimsum sebelum masuk PC. Dua hal utama yang diukur:
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>PZEM Power Sensor:</b> Pantau konsumsi listrik (kWh) real-time — hasilnya dibandingkan langsung dengan data PLC existing, bukan hanya dicatat sendiri.</li>
    <li><b>Proximity Sensor In & Out:</b> Dipasang di pintu masuk dan keluar tunnel untuk hitung jumlah produk dan ukur berapa lama produk ada di dalam (dwell time) — penting untuk verifikasi kualitas pembekuan.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang kelihatan manfaatnya:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>kWh aktual bisa dikorelsikan langsung dengan jumlah produk yang dibekukan — jadi ketahuan berapa cost listrik per unit, bukan hanya total tagihan bulanan yang ambigu.</li>
    <li>Kalau ada over-freezing atau pemborosan energi, kelihatan dari pola data PZEM vs output, bukan baru tahu di akhir bulan.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>QC:</b> Dwell time dan suhu tunnel terekam per batch — bukti konkret kalau proses pembekuan sudah sesuai standar, siap disajikan saat ada audit.</li>
    <li><b>Maintenance:</b> Kalau beban daya atau dwell time mulai menyimpang dari biasanya, itu sinyal awal untuk cek kondisi tunnel sebelum terjadi kerusakan serius.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Tidak perlu catat manual waktu masuk/keluar produk di area dingin ekstrem — semua dicatat otomatis.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 58, toRow: 61, fromCol: 28, toCol: 39, height: 9, color: "#0891b2" },
        { fromRow: 53, toRow: 56, fromCol: 28, toCol: 39, height: 9, color: "#06b6d4" },
        { fromRow: 47, toRow: 51, fromCol: 28, toCol: 34, height: 6, color: "#22d3ee" },
        { fromRow: 19, toRow: 22, fromCol: 32, toCol: 41, height: 9, color: "#0e7490" },
        { fromRow: 13, toRow: 17, fromCol: 32, toCol: 40, height: 6, color: "#0891b2" },
        { fromRow: 24, toRow: 28, fromCol: 28, toCol: 34, height: 6, color: "#06b6d4" },
        { fromRow: 30, toRow: 34, fromCol: 28, toCol: 39, height: 9, color: "#22d3ee" },
        { fromRow: 36, toRow: 40, fromCol: 28, toCol: 39, height: 9, color: "#0891b2" },
        { fromRow: 42, toRow: 45, fromCol: 28, toCol: 34, height: 6, color: "#0e7490" }
    ]
};
