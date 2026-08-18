export const boiler = {
    id: "boiler",
    name: "Electrical & Water",
    class: "support",
    color: "#f43f5e",
    pin: { row: 8, col: 55 },
    card: {
        title: "Electrical & Water Monitoring Station",
        subtitle: "Pusat Pengawasan Energi Listrik & Air",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#f43f5e",
                info: `Data listrik dan air di pabrik ini datang dari PC Dedicated milik vendor utilitas. Caranya? Di-sniff dan di-forward otomatis ke sistem monitoring terpadu lewat script/aplikasi custom-build.
<b>Alur Forward Data:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Sniffing PC Dedicated Vendor:</b> Data penggunaan listrik dan air ditangkap langsung dari sistem PC vendor tanpa mengganggu sistem mereka.</li>
    <li><b>Auto Forwarding:</b> Data yang ditangkap langsung dikirim otomatis ke dashboard monitoring — tidak ada yang perlu direkap ulang secara manual.</li>
</ul>`

            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang langsung terasa:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Konsumsi listrik dan air kelihatan real-time — kalau ada lonjakan tidak wajar, langsung kelihatan sebelum jadi tagihan besar di akhir bulan.</li>
    <li>Laporan utilitas tidak perlu lagi dicatat manual dari meteran fisik — data otomatis terekam per shift.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Engineering/Maintenance:</b> Anomali beban bisa jadi sinyal awal kerusakan peralatan atau kebocoran sebelum menjadi masalah lebih besar.</li>
    <li><b>Finance:</b> Alokasi cost energi per shift dihitung dari data aktual, bukan asumsi rata-rata yang sering meleset.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Operator tidak perlu bolak-balik ke stasiun vendor untuk cek angka — data sudah ada di dashboard.</li>
</ul>`

            }
        ]
    },
    cells: [
        { fromRow: 6, toRow: 7, fromCol: 48, toCol: 64, height: 8, color: "#0d9488" }
    ]
};

export const workshop = {
    id: "workshop",
    name: "Environment Temp & Humidity",
    class: "support",
    color: "#8b5cf6",
    pin: { row: 40, col: 40 },
    card: {
        title: "Environment Temperature & Humidity",
        subtitle: "Sensor Suhu & Kelembapan Ruangan",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#8b5cf6",
                info: `Sensor suhu dan kelembapan dipasang di titik-titik strategis area produksi dan gudang — tidak hanya satu tempat, tapi tersebar sesuai kebutuhan tiap zona ruangan.
<b>Yang dipantau:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Telemetri Real-Time:</b> Suhu dan kelembapan ambient terbaca terus-menerus. Kalau ada yang keluar batas normal, langsung kelihatan dari dashboard.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang langsung terasa:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Kelembapan berlebih di atap atau dinding kelihatan sebelum jadi embun yang jatuh ke bahan baku atau produk — risiko mutu bisa dicegah lebih awal.</li>
    <li>Suhu ruang produksi terpantau aktual — jadi tahu apakah kondisi sudah sesuai standar higienitas atau belum, tidak hanya menebak dari perasaan.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Maintenance HVAC:</b> Kalau suhu di satu zona mulai naik tidak normal, tim bisa tahu sebelum unit pendingin benar-benar mati.</li>
    <li><b>Operator & K3:</b> Data suhu ruang membantu tentukan APD yang tepat — butuh jaket atau tidak, situasi aman untuk operasional atau perlu tindakan lebih dulu.</li>
    <li>Parameter pemeliharaan segel pintu dan penanganan bahan jadi lebih mudah karena ada angka aktual dari lapangan, bukan perkiraan.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 55, toRow: 56, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 44, toRow: 45, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 39, toRow: 40, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 33, toRow: 34, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 24, toRow: 25, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 17, toRow: 18, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 10, toRow: 11, fromCol: 11, toCol: 11, height: 8, color: "#51f590" },
        { fromRow: 24, toRow: 25, fromCol: 5, toCol: 5, height: 8, color: "#51f590" },
        { fromRow: 42, toRow: 43, fromCol: 4, toCol: 4, height: 8, color: "#51f590" },
        { fromRow: 26, toRow: 27, fromCol: 17, toCol: 17, height: 8, color: "#51f590" },
        { fromRow: 37, toRow: 38, fromCol: 17, toCol: 17, height: 8, color: "#51f590" },
        { fromRow: 28, toRow: 29, fromCol: 23, toCol: 23, height: 8, color: "#51f590" },
        { fromRow: 46, toRow: 47, fromCol: 24, toCol: 24, height: 8, color: "#51f590" },
        { fromRow: 15, toRow: 16, fromCol: 35, toCol: 35, height: 8, color: "#51f590" },
        { fromRow: 20, toRow: 21, fromCol: 36, toCol: 36, height: 8, color: "#51f590" },
        { fromRow: 27, toRow: 28, fromCol: 31, toCol: 31, height: 8, color: "#51f590" },
        { fromRow: 33, toRow: 34, fromCol: 34, toCol: 34, height: 8, color: "#51f590" },
        { fromRow: 39, toRow: 40, fromCol: 34, toCol: 34, height: 8, color: "#51f590" },
        { fromRow: 43, toRow: 44, fromCol: 30, toCol: 30, height: 8, color: "#51f590" },
        { fromRow: 49, toRow: 50, fromCol: 30, toCol: 30, height: 8, color: "#51f590" },
        { fromRow: 55, toRow: 56, fromCol: 34, toCol: 34, height: 8, color: "#51f590" },
        { fromRow: 59, toRow: 60, fromCol: 32, toCol: 32, height: 8, color: "#51f590" },
        { fromRow: 24, toRow: 25, fromCol: 50, toCol: 50, height: 8, color: "#51f590" },
        { fromRow: 45, toRow: 46, fromCol: 48, toCol: 48, height: 8, color: "#51f590" },
        { fromRow: 12, toRow: 13, fromCol: 51, toCol: 51, height: 8, color: "#51f590" },
        { fromRow: 55, toRow: 56, fromCol: 49, toCol: 49, height: 8, color: "#51f590" },
        { fromRow: 15, toRow: 16, fromCol: 74, toCol: 74, height: 8, color: "#51f590" },
        { fromRow: 31, toRow: 32, fromCol: 75, toCol: 75, height: 8, color: "#51f590" },
        { fromRow: 39, toRow: 40, fromCol: 74, toCol: 74, height: 8, color: "#51f590" },
        { fromRow: 16, toRow: 17, fromCol: 82, toCol: 82, height: 8, color: "#51f590" },
        { fromRow: 28, toRow: 29, fromCol: 82, toCol: 82, height: 8, color: "#51f590" },
        { fromRow: 47, toRow: 48, fromCol: 82, toCol: 82, height: 8, color: "#51f590" },
        { fromRow: 51, toRow: 52, fromCol: 82, toCol: 82, height: 8, color: "#51f590" },
        { fromRow: 54, toRow: 55, fromCol: 89, toCol: 89, height: 8, color: "#51f590" },
        { fromRow: 43, toRow: 44, fromCol: 87, toCol: 87, height: 8, color: "#51f590" },
        { fromRow: 36, toRow: 37, fromCol: 87, toCol: 87, height: 8, color: "#51f590" },
        { fromRow: 31, toRow: 32, fromCol: 88, toCol: 88, height: 8, color: "#51f590" },
        { fromRow: 27, toRow: 28, fromCol: 87, toCol: 87, height: 8, color: "#51f590" },
        { fromRow: 22, toRow: 23, fromCol: 87, toCol: 87, height: 8, color: "#51f590" },
        { fromRow: 17, toRow: 18, fromCol: 86, toCol: 86, height: 8, color: "#51f590" },
        { fromRow: 11, toRow: 12, fromCol: 87, toCol: 87, height: 8, color: "#51f590" },
        { fromRow: 14, toRow: 15, fromCol: 93, toCol: 93, height: 8, color: "#51f590" },
        { fromRow: 37, toRow: 38, fromCol: 93, toCol: 93, height: 8, color: "#51f590" },
        { fromRow: 17, toRow: 18, fromCol: 96, toCol: 96, height: 8, color: "#51f590" },
        { fromRow: 34, toRow: 35, fromCol: 97, toCol: 97, height: 8, color: "#51f590" },
        { fromRow: 54, toRow: 55, fromCol: 96, toCol: 96, height: 8, color: "#51f590" }
    ]
};

export const qclab = {
    id: "qclab",
    name: "Warehouse Gate Alarm",
    class: "support",
    color: "#10b981",
    pin: { row: 14, col: 35 },
    card: {
        title: "Warehouse Gate Alarm System",
        subtitle: "Sistem Monitoring Pintu Gudang (ESP32)",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#10b981",
                info: `Sistem ESP32 yang pantau semua pintu gudang. Logikanya sederhana: kalau pintu terbuka lebih dari 5 menit, alarm berbunyi. Saat pintu ditutup lagi, timer reset ke nol.
<b>Mekanisme lengkapnya:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Deteksi >5 Menit:</b> Sensor magnetik ESP32 pantau status pintu terus. Lewat 5 menit, buzzer/siren aktif otomatis.</li>
    <li><b>Tutup = Reset:</b> Pintu ditutup rapat, timer langsung kembali ke 0. Tidak perlu reset manual.</li>
    <li><b>Real-Time Dashboard:</b> Status semua pintu bisa dipantau dari dashboard — kelihatan mana yang open, sudah berapa lama, dan kapan terakhir dibuka/tutup.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Kenapa ini perlu diprioritaskan:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Pintu gudang terbuka lama itu musuh utama efisiensi pendinginan — suhu bocor, listrik chiller naik, dan produk di dekat pintu bisa terdampak.</li>
    <li>Sekarang ada "pengawas otomatis" — tidak lagi tergantung kesadaran masing-masing orang untuk ingat tutup pintu.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>QC/Food Safety:</b> Stabilitas suhu produk jadi terjaga — tidak ada lagi fluktuasi suhu karena pintu dilupakan saat jam sibuk.</li>
    <li><b>Finance:</b> Penghematan listrik chiller nyata — bisa dihitung dari data konsumsi sebelum vs sesudah alarm dipasang.</li>
    <li><b>Keamanan:</b> Pintu yang terbuka lama juga risiko keamanan — hama, debu, atau orang tidak berkepentingan bisa masuk zona steril.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Alarm suara dan visual langsung terdengar/terlihat di area — siapapun yang ada di dekat pintu langsung tahu dan bisa tutup.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 54, toRow: 56, fromCol: 18, toCol: 18, height: 8, color: "#f551ef" },
        { fromRow: 28, toRow: 30, fromCol: 18, toCol: 18, height: 8, color: "#f551ef" },
        { fromRow: 40, toRow: 42, fromCol: 18, toCol: 18, height: 8, color: "#f551ef" },
        { fromRow: 57, toRow: 59, fromCol: 6, toCol: 6, height: 8, color: "#f551ef" },
        { fromRow: 43, toRow: 45, fromCol: 6, toCol: 6, height: 8, color: "#f551ef" },
        { fromRow: 32, toRow: 34, fromCol: 6, toCol: 6, height: 8, color: "#f551ef" },
        { fromRow: 17, toRow: 19, fromCol: 6, toCol: 6, height: 8, color: "#f551ef" },
        { fromRow: 50, toRow: 52, fromCol: 95, toCol: 95, height: 8, color: "#f551ef" },
        { fromRow: 60, toRow: 62, fromCol: 95, toCol: 95, height: 8, color: "#f551ef" },
        { fromRow: 43, toRow: 45, fromCol: 91, toCol: 91, height: 8, color: "#f551ef" },
        { fromRow: 36, toRow: 38, fromCol: 91, toCol: 91, height: 8, color: "#f551ef" },
        { fromRow: 23, toRow: 25, fromCol: 92, toCol: 92, height: 8, color: "#f551ef" },
        { fromRow: 14, toRow: 16, fromCol: 92, toCol: 92, height: 8, color: "#f551ef" },
        { fromRow: 57, toRow: 59, fromCol: 84, toCol: 84, height: 8, color: "#f551ef" },
        { fromRow: 48, toRow: 50, fromCol: 84, toCol: 84, height: 8, color: "#f551ef" },
        { fromRow: 40, toRow: 42, fromCol: 84, toCol: 84, height: 8, color: "#f551ef" },
        { fromRow: 36, toRow: 38, fromCol: 84, toCol: 84, height: 8, color: "#f551ef" },
        { fromRow: 24, toRow: 26, fromCol: 84, toCol: 84, height: 8, color: "#f551ef" },
        { fromRow: 13, toRow: 15, fromCol: 84, toCol: 84, height: 8, color: "#f551ef" }
    ]
};

export const machineRunHours = {
    id: "machineRunHours",
    name: "Machine Run Hours & Telemetry",
    class: "support",
    color: "#eab308",
    pin: { row: 32, col: 60 },
    card: {
        title: "Machine Run Hours & Telemetry System",
        subtitle: "Monitoring Durasi, Sinyal Operasional & Estimasi Maintenance Mesin",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#eab308",
                info: `Sistem pemantauan status operasional dan durasi kerja (*running hours*) pada mesin-mesin produksi & utilitas menggunakan sensor IoT dan antarmuka digital.
<b>Teknologi & Sensor yang Diterapkan:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Optocoupler / Relay Interface:</b> Menangkap sinyal digital ON/OFF langsung dari kontak mesin untuk mencatat *timespan* dan durasi mesin beroperasi (running time vs idle time).</li>
    <li><b>Sensor Elektrikal (PZEM / Current Transformer):</b> Untuk mesin berdaya besar yang membutuhkan pemantauan konsumsi daya (kWh) dan kalkulasi biaya listrik operasional (*electrical cost*).</li>
    <li><b>Vibration Sensor (Accelerometer):</b> Dipasang pada mesin berbasis motor atau servo untuk membaca tingkat getaran abnormal sebagai indikator *predictive maintenance* dan estimasi keausan komponen.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Yang langsung terasa:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Visibility penuh durasi jalan (*running hours*) setiap mesin — tahu pasti mana mesin yang produktif dan mana yang terlalu lama idle.</li>
    <li>Pencegahan kerusakan fatal pada motor/servo berkat peringatan dini getaran tak wajar (*vibration anomaly*).</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Maintenance & Engineering:</b> Perencanaan *preventive maintenance* berbasis jam kerja aktual (*running hours*) & tingkat getaran, bukan sekadar jadwal bulanan manual.</li>
    <li><b>Plant Manager & PPIC:</b> Traceability operasional mesin per batch/shift untuk evaluasi OEE (Availability & Operational Efficiency).</li>
    <li><b>Finance:</b> Alokasi biaya listrik per mesin terukur presisi jika dilengkapi sensor PZEM.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Data operasional tertangkap otomatis tanpa mengganggu alur kerja operator di mesin.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 31, toRow: 33, fromCol: 58, toCol: 62, height: 8, color: "#eab308" }
    ]
};

