export const mixing = {
    id: "Mixing",
    name: "Mixing",
    class: "produksi",
    color: "#14b8a6",
    pin: { row: 14, col: 76 },
    card: {
        title: "Industrial Mixing Room",
        subtitle: "Ruang Pencampuran",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#14b8a6",
                info: `Sebelumnya ada gagasan dedicated meat cart dengan RFID — tapi itu kurang fleksibel untuk kondisi sekarang. Sekarang arahnya lebih adaptif: telemetri lewat AI Vision berbasis kamera existing, dengan cart diberi <b>Color Tag</b> (cat kecil food-grade) sebagai penanda.
<img src='/mixing.png' alt='Mixing Flow' style='max-width:100%;margin:8px 0;border-radius:6px;' />
<b>Catatan Teknis:</b> Perlu hardware yang cukup untuk training AI Vision-nya — cukup dilakukan sekali di awal, lalu diperbarui berkala tiap beberapa bulan. Operator tetap input informasi harian seperti biasa, sistem berjalan semi-otomatis di belakangnya. Ini juga sekaligus jadi pengaman: kalau ada yang tidak sesuai prosedur, kelihatan dari data.`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Nilai nyata buat bisnis:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Komposisi adonan yang konsisten berdampak langsung ke mutu produk akhir — lebih stabil, lebih bisa diprediksi.</li>
    <li>Kalau data bahan baku vs jumlah cart adonan jelas, lebih mudah ketahuan mana yang boros dan mana yang efisien.</li>
    <li>Pola jam puncak produksi kelihatan — lebih mudah untuk cegah over atau under produksi yang biasanya baru ketahuan setelah kejadian.</li>
</ul>
<b>Lintas divisi yang terbantu:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>WH → Mixing: traceability bahan dari gudang ke ruang produksi jadi terhubung, bukan dua sistem yang terpisah.</li>
    <li>Management bisa lihat efisiensi shift tanpa nunggu laporan turun dari lapangan.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Proses mixing terekam otomatis — kalau ada yang tidak beres, ada data untuk diperiksa bersama, bukan hanya ingatan orang.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 9, toRow: 22, fromCol: 70, toCol: 80, height: 8, color: "#0d9488" }
    ]
};

export const chilled = {
    id: "Chilled",
    name: "Chilled",
    class: "produksi",
    color: "#3b82f6",
    pin: { row: 28, col: 76 },
    card: {
        title: "Chilled Storage Room",
        subtitle: "Penyimpanan Troli (Terisi & Kosong)",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#3b82f6",
                info: `Penggunaan <i>Camera Recognition / AI Vision</i> di kamera existing untuk menghitung cart terisi dan cart kosong yang siap distribusi secara otomatis — sekaligus tracking berapa lama cart sudah ada di situ (<i>time-standing</i>).
<img src='/chilled.png' alt='Chilled Storage Flow' style='max-width:100%;margin:8px 0;border-radius:6px;' />
<b>Catatan Teknis:</b> Menggunakan model AI vision yang ringan supaya tidak membebani server. Di gate Chilled Room dipasang <i>Display Matrix</i> yang langsung kasih tahu operator: adonan ini untuk lini mana, jadwal produksinya kapan, dan kemana harus dikirim — tanpa perlu komunikasi verbal bolak-balik.`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#3898ed",
                info: `<b>Dampak yang dirasakan:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Ada early alarm otomatis kalau adonan terlalu lama disimpan — tim tahu sebelum mutu adonan turun, bukan setelah.</li>
    <li>Cart tidak numpuk berlebihan — bottleneck antara Mixing dan lini produksi kelihatan lebih awal.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Jumlah cart kosong terpantau — tim Mixing tahu kapan cart siap diisi lagi tanpa harus cek manual ke Chilled.</li>
    <li>Maintenance bisa jadwalkan sanitasi cart tanpa ganggu alur produksi, karena tahu mana cart yang sedang kosong dan berapa lama.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Display Matrix di gate bantu operator distribusikan adonan ke lini yang benar langsung — tidak ada kebingungan soal 'ini cart untuk siapa'.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 23, toRow: 35, fromCol: 70, toCol: 80, height: 6, color: "#2563eb" }
    ]
};

export const hotRoom = {
    id: "Hot Room",
    name: "Hot Room",
    class: "produksi",
    color: "#ef4444",
    pin: { row: 38, col: 75 },
    card: {
        title: "Thermal / Hot Room",
        subtitle: "Ruang Inkubasi & Suhu Tinggi",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#ef4444",
                info: `Penerapan <i>Smart Weighing System</i> untuk catat alur bahan In/Out secara otomatis, plus PZEM yang pantau konsumsi listrik heater aktual — dibandingkan langsung dengan data PLC yang ada.
<img src='/hot.png' alt='Hot Room Flow' style='max-width:100%;margin:8px 0;border-radius:6px;' />`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang bisa diambil dari sini:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Cost listrik heater per batch Acin bisa dihitung aktual — bukan estimasi flat yang sering tidak mencerminkan pemakaian nyata.</li>
    <li>Durasi inkubasi yang ideal terkonfirmasi dari suhu ruangan aktual, bukan cuma mengandalkan set point PLC — mutu produk lebih konsisten antar batch.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Bahan masuk dan keluar Hot Room tercatat digital — traceability antar divisi tidak ada celah lagi.</li>
    <li>Anomali beban daya heater bisa jadi sinyal awal sebelum elemen pemanas turun performa.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Tidak perlu catat ulang hasil timbang manual — langsung masuk sistem, mengurangi risiko salah angka di area suhu tinggi.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 36, toRow: 42, fromCol: 70, toCol: 80, height: 6, color: "#dc2626" }
    ]
};
