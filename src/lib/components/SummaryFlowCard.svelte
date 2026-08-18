<script>
    import { createEventDispatcher } from "svelte";
    import { X } from "lucide-svelte";

    const dispatch = createEventDispatcher();
    let activeStepIndex = 0;
    let activeView = "flow"; // "flow" | "summary"

    const steps = [
        {
            code: "01",
            name: "WHRM",
            title: "WHRM (Gudang Bahan Baku)",
            subtitle: "Inbound / Outbound & Pencatatan Tonase",
            color: "#f97316",
            desc: "Pencatatan inbound & outbound bahan baku dari gudang WHRM berdasarkan work order produksi. Smart Scale RS232 menangkap bobot otomatis, suhu gudang dipantau dan dibandingkan dengan PLC existing.",
            comparison: {
                plc: "Monitoring Suhu (PLC existing gudang)",
                iot: "Smart Scale RS232 (Auto Weight In/Out) + Sensor Suhu",
                insite: "Form Inbound, Outbound, Relokasi — WHRM App (Operator Gudang)",
            },
            impact: [
                {
                    div: "Warehouse/Logistics",
                    text: "Baseline tonase real-time — titik rekonsiliasi pertama sebelum dibandingkan dengan penerimaan Mixing. Selisih fisik vs sistem terdeteksi di sini.",
                },
                {
                    div: "PPIC",
                    text: "Validasi pengeluaran bahan terhadap work order — cegah pengeluaran di luar rencana produksi.",
                },
                {
                    div: "Cost/Finance",
                    text: "Fondasi audit pemakaian bahan sepanjang alur. Kalau baseline salah, semua komparasi susut di stage berikutnya tidak valid.",
                },
                {
                    div: "Purchasing",
                    text: "Jadwal restock dari tren outbound aktual, bukan estimasi — hindari overstock maupun understock.",
                },
            ],
        },
        {
            code: "02",
            name: "MIXING",
            title: "Industrial Mixing Room",
            subtitle: "Penerimaan Bahan, Color Tag & Komparasi Susut",
            color: "#14b8a6",
            desc: "Pencampuran adonan dengan komparasi material: membandingkan pengeluaran WHRM vs permintaan Mixing vs penerimaan aktual untuk mendeteksi susut/kehilangan bahan saat transfer. Cart ditandai Color Tag (cat food-grade) sebagai ID untuk AI Vision.",
            comparison: {
                plc: "Sniffing PLC Mixer (Durasi Aduk per batch)",
                iot: "Color Tag Cart (ID AI Vision) + Modbus Weighing + Path Distribution Camera",
                insite: "Komparasi Output WHRM vs Input Mixing (DW App)",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "Selisih WHRM vs Mixing terdeteksi langsung — susut bahan bisa diaudit sebelum jadi loss yang tidak terlacak sumbernya.",
                },
                {
                    div: "QC",
                    text: "Color Tag cegah salah kategori adonan ke lini yang tidak sesuai formula produk.",
                },
                {
                    div: "PPIC",
                    text: "Pola over-request adonan kelihatan — cegah cart numpuk di Chilled atau waste di lini.",
                },
                {
                    div: "Plant/OEE",
                    text: "Durasi mixing per batch jadi data kapasitas mesin, dasar penjadwalan batch berikutnya.",
                },
            ],
        },
        {
            code: "03",
            name: "CHILLED",
            title: "Chilled Storage Room",
            subtitle: "Buffer Simpan Cart & Display Matrix Gate",
            color: "#3b82f6",
            desc: "Area simpan sementara cart adonan (terisi & kosong steril) sebelum didistribusikan ke lini. AI Vision Camera hitung cart in/out otomatis, ESP32 pantau suhu komparasi PLC chiller. Display Matrix di gate memberi arahan lini tujuan distribusi.",
            comparison: {
                plc: "PLC Chiller Compressors (Set Point suhu)",
                iot: "Sensor Suhu ESP32 + AI Vision Counter Cart + Display Matrix Gate",
                insite: "Log Checksheet Suhu Shift & jumlah cart in/out (Operator QC)",
            },
            impact: [
                {
                    div: "QC/Food Safety",
                    text: "Early alarm jika adonan terlalu lama di luar suhu ideal — deteriorasi mutu dicegah sebelum masuk lini.",
                },
                {
                    div: "Warehouse/Logistics",
                    text: "Jumlah cart real-time = indikator kapasitas buffer, hindari penumpukan yang blokir alur kerja.",
                },
                {
                    div: "PPIC",
                    text: "Lama cart 'tunggu' di Chilled = indikator bottleneck antara Mixing dan routing lini.",
                },
                {
                    div: "Operator",
                    text: "Display Matrix di gate pandu distribusi adonan ke lini yang tepat tanpa komunikasi verbal berulang.",
                },
            ],
        },
        {
            code: "04",
            name: "HOT ROOM",
            title: "Thermal / Hot Room",
            subtitle: "Inkubasi Adonan Acin & Telemetri Heater",
            color: "#ef4444",
            desc: "Ruang inkubasi suhu tinggi (~45°C) khusus adonan Acin sebelum masuk AN Line. Smart Weighing RS232 catat bahan In/Out, PZEM pantau konsumsi listrik heater aktual dibandingkan dengan PLC.",
            comparison: {
                plc: "PLC Heater Control (Set Point & Durasi Inkubasi)",
                iot: "Smart Scale RS232 (In/Out Weight Capture) + PZEM Cost Heater",
                insite: "Form Check Suhu & Durasi Inkubasi (Operator Shift)",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "Cost listrik heater per batch Acin terhitung aktual, bukan estimasi flat — dasar biaya produksi Acin per unit.",
                },
                {
                    div: "QC/Food Safety",
                    text: "Durasi inkubasi dari suhu aktual, bukan hanya set point PLC — menjaga konsistensi mutu tekstur Acin antar batch.",
                },
                {
                    div: "Plant/Maintenance",
                    text: "Anomali beban daya heater = early warning penurunan performa elemen pemanas.",
                },
                {
                    div: "Traceability",
                    text: "Bahan In/Out Hot Room tercatat digital, menutup gap data antara Chilled dan AN Line.",
                },
            ],
        },
        {
            code: "05",
            name: "AN LINE",
            title: "AN Processing Line (Acin)",
            subtitle: "Timbang Manual + RS232 Auto-Capture",
            color: "#d946ef",
            desc: "Lini Acin dengan pemasakan kering tanpa minyak. Operator timbang fisik seperti biasa, data hasil timbangan ditangkap otomatis via RS232 — tidak ada perubahan alur kerja operator.",
            comparison: {
                plc: "PLC Acin Line (Speed / Heater Duration)",
                iot: "RS232 Smart Weighing Interface (Auto Capture dari Timbangan Manual)",
                insite: "Form Output Acin per batch (Operator Lini)",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "Output Acin per batch tercatat akurat otomatis — dasar yield dan biaya produksi tanpa rekap manual rawan salah.",
                },
                {
                    div: "QC",
                    text: "Eliminasi human error pencatatan timbangan di area suhu tinggi — data valid untuk audit mutu.",
                },
                {
                    div: "Management",
                    text: "Rekap harian tersedia otomatis di sistem tanpa rekap ulang dari kertas per shift.",
                },
                {
                    div: "Traceability",
                    text: "Output AN Line terhubung ke sistem pusat, menutup gap data antara produksi dan penyimpanan.",
                },
            ],
        },
        {
            code: "06",
            name: "UK LINE",
            title: "UK Processing Line",
            subtitle: "Forming → Frying → Checking + PZEM & Proximity",
            color: "#8b5cf6",
            desc: "Lini continuous UK: Adonan + Keju + Minyak dari Forming → Frying → Checking. Proximity sensor food-grade cacah output tiap tahap (pcs/min), PZEM pantau kWh, dibandingkan dengan data PLC Forming & PLC Frying.",
            comparison: {
                plc: "PLC Forming & PLC Frying (Speed & Suhu Fryer)",
                iot: "Proximity Non-Metal/Hall Sensor (After Forming, After Frying, After Checking pcs/min) + PZEM kWh",
                insite: "Laporan Output Form UK (Operator) + DW App",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "Konsumsi Adonan + Keju + Minyak vs output pcs terverifikasi aktual — giveaway bahan langsung terdeteksi, bukan akhir bulan.",
                },
                {
                    div: "Plant/OEE",
                    text: "Speed loss per tahap (Forming vs Frying vs Checking) = OEE aktual UK Line, bukan asumsi shift report.",
                },
                {
                    div: "QC",
                    text: "Drop rate antar tahap = indikasi kualitas adonan atau setting mesin yang perlu evaluasi sebelum berdampak ke reject MDCW.",
                },
                {
                    div: "PPIC",
                    text: "Throughput aktual pcs/min jadi dasar perencanaan target batch yang realistis per shift.",
                },
            ],
        },
        {
            code: "07",
            name: "DIMSUM",
            title: "Dimsum Processing Line",
            subtitle: "Forming → Checking (tanpa Frying) + PZEM & Proximity",
            color: "#a855f7",
            desc: "Lini continuous Dimsum: Adonan Luar + Adonan Isian dari Forming → Checking (tanpa frying/minyak). Proximity sensor cacah output, PZEM pantau kWh, dibandingkan dengan data PLC Forming.",
            comparison: {
                plc: "PLC Forming Dimsum (Speed)",
                iot: "Proximity Non-Metal/Hall Sensor (After Forming, After Checking pcs/min) + PZEM kWh",
                insite: "Laporan Output Form Dimsum (Operator) + DW App",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "Konsumsi Adonan Luar & Isian vs output pcs terhitung aktual — dasar audit waste formula Dimsum.",
                },
                {
                    div: "Plant/OEE",
                    text: "Drop rate Forming vs Checking = efektivitas mesin cetak dan kualitas adonan isian per batch.",
                },
                {
                    div: "QC",
                    text: "Selisih after forming vs after check langsung mencerminkan reject QC visual — bisa ditelusuri ke batch siapa dan shift apa.",
                },
                {
                    div: "PPIC",
                    text: "Perbandingan throughput UK vs Dimsum bantu load balancing kapasitas lini untuk shift berikutnya.",
                },
            ],
        },
        {
            code: "08",
            name: "MIE LINE",
            title: "Noodle Processing Line",
            subtitle: "PLC Sniffing — Tepung, Air, Running Hours & Mode Log",
            color: "#eab308",
            desc: "Lini mie berbasis PLC Sniffing real-time. Saat ini alur hilir mie belum sepenuhnya terkonfirmasi, namun diasumsikan melewati jalur yang sama. Parameter: jam running mesin, tepung (kg), air (Liter/m³), serta log mode operasi Auto vs Manual lengkap dengan timestamp.",
            comparison: {
                plc: "Sniffing PLC Mie Line (Running Hours, Tepung kg, Air Liter/m³)",
                iot: "Log Action & Mode Tracking (Auto/Manual Mode + Timestamp Intervensi)",
                insite: "Checksheet Bahan & Produksi Mie (Operator Shift)",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "Rasio Tepung + Air per batch vs output mie terhitung aktual — waste formula bisa diaudit per shift tanpa rekap manual.",
                },
                {
                    div: "Plant/OEE",
                    text: "Running Hours terekam otomatis = dasar perhitungan OEE Mie Line dan penjadwalan preventive maintenance berbasis jam jalan.",
                },
                {
                    div: "QC/SOP",
                    text: "Log Auto vs Manual Mode memberi visibilitas ke QC dan Supervisor kalau ada penyimpangan SOP operasional — siapa, kapan, berapa lama.",
                },
                {
                    div: "Management",
                    text: "Data ini terekam tanpa perubahan prosedur operator — pure sniffing, investasi sensor minimal, nilai data maksimal.",
                },
            ],
        },
        {
            code: "09",
            name: "IQF",
            title: "IQF Tunnel Freezer",
            subtitle: "Pembekuan Cepat — Pre-Packing Center",
            color: "#06b6d4",
            desc: "Pembekuan cepat produk sebelum masuk stasiun PC. Proximity In/Out ukur jumlah produk dan dwell time, PZEM ukur kWh aktual, dikomparasi dengan data PLC tunnel.",
            comparison: {
                plc: "PLC Tunnel Temp & Speed (Set Point suhu)",
                iot: "PZEM Energy Meter + Proximity In/Out (counting & dwell time) + Monitoring Suhu",
                insite: "Checksheet Dwell Time & Suhu Shift (Operator QC)",
            },
            impact: [
                {
                    div: "Cost/Finance",
                    text: "kWh aktual ÷ jumlah produk = cost freezing per unit — presisi per batch, bukan estimasi rata-rata bulanan.",
                },
                {
                    div: "QC/Food Safety",
                    text: "Dwell time & suhu terekam otomatis per batch — bukti compliance pembekuan sesuai standar, siap audit kapan saja.",
                },
                {
                    div: "Plant/Maintenance",
                    text: "Penyimpangan suhu atau dwell time dari set point = early warning penurunan performa tunnel freezer.",
                },
                {
                    div: "Traceability",
                    text: "Proximity In vs Out verifikasi tidak ada produk tertinggal di tunnel — menutup gap hitungan output lini ke input PC.",
                },
            ],
        },
        {
            code: "10",
            name: "PC",
            title: "Packing Center (PC)",
            subtitle: "Timbang Akhir & Cetak Primary QR Code",
            color: "#ec4899",
            desc: "Stasiun timbang produk terbeku. Setiap unit ditimbang via Digital Scale RS232, lalu dicetak Primary QR Code sebagai identitas unik produk — titik origin seluruh hierarki traceability sistem.",
            comparison: {
                plc: "PLC Conveyor Feed",
                iot: "Digital Scale RS232 (Auto Weight Capture) + Engine Printer QR Primary",
                insite: "Form Packing PC (Operator Packing)",
            },
            impact: [
                {
                    div: "QC/Traceability",
                    text: "Origin identitas produk. Setiap Primary QR adalah referensi balik untuk recall, audit mutu, dan klaim kualitas ke depannya.",
                },
                {
                    div: "Cost/Finance",
                    text: "Timbang akhir akurat cegah over-fill (giveaway cost terakumulasi) dan under-fill (risiko komplain & denda regulator).",
                },
                {
                    div: "Legal/Audit",
                    text: "Data QR Primary adalah fondasi laporan traceability ke BPOM, audit klien, atau retailer — kualitas data di sini menentukan keandalan seluruh laporan batch.",
                },
                {
                    div: "Operator",
                    text: "Cetak QR otomatis dari hasil timbang, menghilangkan input label manual, mempercepat throughput PC.",
                },
            ],
        },
        {
            code: "11",
            name: "MDCW",
            title: "QC MDCW (Metal Detector & Check Weigher)",
            subtitle: "Passive Modbus RS485 Sniffing + Auto Reject",
            color: "#6366f1",
            desc: "Sniffing pasif data Metal Detector & Dynamic Check Weigher via Modbus RTU RS485 — non-intrusive, tidak mengganggu sistem komunikasi mesin. Produk kontaminasi logam atau berat off-spec otomatis di-reject oleh rejector pneumatik.",
            comparison: {
                plc: "Passive RS485 Sniffer (baca frame komunikasi Controller–HMI, non-intrusive)",
                iot: "Sniffer Node IoT (hanya baca, tidak menulis ke sistem mesin)",
                insite: "QC Sampling Logbook & Audit Reject (Operator QC)",
            },
            impact: [
                {
                    div: "QC/Food Safety",
                    text: "Filter kontaminasi logam 100% otomatis per unit, bukan sampling. Setiap produk keluar lini sudah terverifikasi — bukti compliance audit food safety.",
                },
                {
                    div: "Cost/Finance",
                    text: "Reject rate per shift/batch terekam otomatis — cost of quality dihitung per lini & batch, bukan hanya total bulanan yang ambigu.",
                },
                {
                    div: "Management",
                    text: "Data reject otomatis vs laporan manual dibandingkan — gap antara kondisi aktual mesin dan laporan lapangan langsung terlihat.",
                },
                {
                    div: "Legal/Reputasi",
                    text: "Rekaman kontaminasi yang terdeteksi + timestamp = bukti defensif kalau ada klaim kontaminasi dari pasar.",
                },
            ],
        },
        {
            code: "12",
            name: "SP",
            title: "Secondary Packing (SP)",
            subtitle: "Karton Master & Barcode Secondary",
            color: "#a855f7",
            desc: "Produk yang lolos MDCW dibungkus ke karton master dan ditempeli Label Barcode Secondary — menghubungkan hierarki Primary QR ke level karton/dus untuk traceability end-to-end.",
            comparison: {
                plc: "Data Mini PC Mesin Existing (SP Line)",
                iot: "Sniffing Printer Barcode Secondary Packing",
                insite: "Verifikasi Jumlah Karton per batch (Operator SP)",
            },
            impact: [
                {
                    div: "QC/Traceability",
                    text: "Primary QR → Secondary Barcode = rantai traceability sampai level dus. Recall per karton spesifik bisa dilakukan tanpa bongkar seluruh batch.",
                },
                {
                    div: "Warehouse/Logistics",
                    text: "Jumlah karton terverifikasi sebelum masuk WHFG — selisih stok diminimalkan di titik ini, bukan ditemukan saat stock opname.",
                },
                {
                    div: "Cost/Finance",
                    text: "Output SP vs reject MDCW = loss bahan aktual per lini & shift, bukan rata-rata divisi yang tidak actionable.",
                },
                {
                    div: "Customer/Sales",
                    text: "Barcode karton terhubung ke Primary QR memperkuat posisi negosiasi dengan buyer yang mensyaratkan traceability produk.",
                },
            ],
        },
        {
            code: "13",
            name: "WHFG",
            title: "WHFG (Warehouse Finished Goods)",
            subtitle: "Inbound Scan Barcode, Alokasi Rak & FIFO",
            color: "#38bdf8",
            desc: "Penerimaan dus produk jadi. Operator scan Barcode Secondary dan input posisi rak & tanggal masuk via Aplikasi Inbound WHFG. Gate Alarm ESP32 aktif jika pintu terbuka >5 menit. App WHFG sebagai pembanding/integrasi sistem existing.",
            comparison: {
                plc: "— (WHFG tidak berbasis PLC; existing: WMS & pallet management)",
                iot: "Warehouse Gate Alarm ESP32 (>5 Menit = Alert + Reset Timer)",
                insite: "Apps Inbound WHFG (Scan Secondary Barcode → Input Rak → Simpan)",
            },
            impact: [
                {
                    div: "Warehouse/Logistics",
                    text: "Posisi rak setiap karton tercatat digital — tim logistik locate produk siap kirim tanpa stock opname fisik, mempercepat outbound.",
                },
                {
                    div: "PPIC",
                    text: "Kapasitas gudang real-time jadi dasar keputusan: apakah produksi shift berikutnya bisa jalan atau perlu tunggu clearance gudang.",
                },
                {
                    div: "Management",
                    text: "FIFO akurat + date-in tracking = early warning produk mendekati expiry sebelum jadi masalah retur atau pemusnahan.",
                },
                {
                    div: "Finance/Audit",
                    text: "Cross-check Barcode SP vs penerimaan WHFG menutup titik terakhir traceability WHRM→WHFG — laporan yield final untuk manajemen tanpa rekap manual.",
                },
            ],
        },
    ];

    const summaryItems = [
        {
            icon: "X",
            title: "Yang Bisa Didapat dari Sistem Ini",
            items: [
                "OEE per lini per shift/batch — berbasis data sensor aktual, bukan estimasi",
                "Yield end-to-end WHRM → WHFG — susut bahan terlacak di tiap titik transfer",
                "Cost per unit produk — breakdown energi (kWh), bahan baku, dan waste per batch",
                "Traceability 100% — dari lot bahan mentah WHRM sampai posisi rak karton di WHFG",
                "Reject rate MDCW per lini & batch — dasar cost of quality yang actionable",
                "Audit log otomatis — siapa, kapan, mode apa, berapa lama di setiap mesin",
            ],
        },
        {
            icon: "X",
            title: "Kemungkinan Peningkatan ke Depan",
            items: [
                "Integrasi ke ERP/MES — data sensor langsung masuk sistem perencanaan produksi",
                "Predictive maintenance — model ML dari running hours & anomali daya PZEM/heater",
                "Auto work order generation — PPIC bisa set trigger batch berikutnya dari data real-time",
                "Dashboards mobile — akses supervisor & QC dari handphone tanpa buka PC",
                "Integrasi BPOM/retailer compliance — export laporan traceability otomatis ke format regulasi",
                "Digital twin — simulasi bottleneck & load balancing antar lini sebelum implementasi perubahan",
            ],
        },
        {
            icon: "X",
            title: "Saran Tambahan",
            items: [
                "Prioritaskan WHRM + Mixing + MDCW dulu — ROI paling cepat terlihat dari susut bahan & reject rate",
                "Dedicated server sejak awal — jangan bergabung di jaringan produksi untuk keamanan data & performa",
                "Training AI Vision Mixing & Chilled perlu hardware awal yang layak — alokasi di fase 1",
                "Standarisasi format data sensor dari awal — memudahkan integrasi ERP di masa depan tanpa refactor besar",
            ],
        },
    ];

    $: activeStep = steps[activeStepIndex] || steps[0];

    function selectStep(index) {
        activeStepIndex = index;
    }

    function closeSummary() {
        dispatch("close");
    }
</script>

<div class="summary-modal-backdrop">
    <div
        class="summary-card"
        style="--active-accent-color: {activeStep.color};"
    >
        <!-- Header -->
        <div class="card-header">
            <div class="card-title-group">
                <div class="card-title">
                    Alur Material, Data &amp; Benefit Sistem
                </div>
                <div class="card-subtitle">
                    Rencana Planing IoT &amp; Digitalisasi PLC (WHRM &rarr;
                    WHFG)
                </div>
            </div>
            <div class="header-right">
                <div class="view-toggle">
                    <button
                        class="toggle-btn {activeView === 'flow'
                            ? 'active-toggle'
                            : ''}"
                        on:click={() => (activeView = "flow")}>Flow</button
                    >
                    <button
                        class="toggle-btn {activeView === 'summary'
                            ? 'active-toggle'
                            : ''}"
                        on:click={() => (activeView = "summary")}
                        >Ringkasan</button
                    >
                </div>
                <button
                    class="card-close-btn"
                    title="Tutup Summary"
                    on:click={closeSummary}
                >
                    <X size={14} />
                </button>
            </div>
        </div>

        <div
            class="morph-bar"
            style="background-color: {activeView === 'flow'
                ? activeStep.color
                : '#00f0ff'};"
        ></div>

        {#if activeView === "flow"}
            <!-- Card Body -->
            <div class="card-body">
                <!-- Numeral Step Rail -->
                <div class="numeral-rail">
                    {#each steps as s, idx}
                        {@const isSelected = idx === activeStepIndex}
                        <button
                            class="numzone {isSelected ? 'active' : ''}"
                            on:click={() => selectStep(idx)}
                        >
                            <span
                                class="bar-accent"
                                style="background-color: {isSelected
                                    ? s.color
                                    : 'rgba(255, 255, 255, 0.15)'};"
                            ></span>
                            <span
                                class="numeral"
                                style="color: {isSelected
                                    ? s.color
                                    : '#7c93ad'};"
                            >
                                {s.code}
                            </span>
                        </button>
                    {/each}
                </div>

                <!-- Content Area -->
                <div class="content-col">
                    <div class="step-head">
                        <span
                            class="step-badge"
                            style="background-color: {activeStep.color}"
                            >TAHAP {activeStep.code}</span
                        >
                        <span class="step-main-title">{activeStep.title}</span>
                    </div>
                    <div class="step-sub">{activeStep.subtitle}</div>

                    <div class="content-body">
                        <p>{activeStep.desc}</p>
                    </div>

                    <!-- 3-Way Data Comparison Cards -->
                    <div class="comp-box-grid">
                        <div class="comp-item plc-border">
                            <div class="comp-item-title">
                                1. Data PLC Sniffing
                            </div>
                            <div class="comp-item-val">
                                {activeStep.comparison.plc}
                            </div>
                        </div>
                        <div class="comp-item iot-border">
                            <div class="comp-item-title">
                                2. Planing IoT Baru
                            </div>
                            <div class="comp-item-val">
                                {activeStep.comparison.iot}
                            </div>
                        </div>
                        <div class="comp-item insite-border">
                            <div class="comp-item-title">
                                3. Data In-Site (Operator)
                            </div>
                            <div class="comp-item-val">
                                {activeStep.comparison.insite}
                            </div>
                        </div>
                    </div>

                    <!-- Impact per-division -->
                    <div class="impact-note-box">
                        <span
                            class="impact-title"
                            style="color: {activeStep.color}"
                            >Dampak &amp; Benefit:</span
                        >
                        <ul class="impact-list">
                            {#each activeStep.impact as item}
                                <li
                                    style="border-left-color: {activeStep.color}44;"
                                >
                                    <span
                                        class="impact-div-tag"
                                        style="color: {activeStep.color}"
                                        >{item.div}</span
                                    >
                                    <span class="impact-desc">{item.text}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        {:else}
            <!-- Summary View -->
            <div class="summary-view">
                {#each summaryItems as section}
                    <div class="summary-section">
                        <div class="summary-section-title">
                            <span class="summary-icon">{section.icon}</span>
                            {section.title}
                        </div>
                        <ul class="summary-list">
                            {#each section.items as item}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .summary-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 5000;
        background: rgba(2, 6, 17, 0.82);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.25s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .summary-card {
        width: min(700px, calc(100vw - 32px));
        max-height: calc(100vh - 48px);
        display: flex;
        flex-direction: column;
        background: #0d1b2a;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.85),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        overflow: hidden;
        font-family:
            "Space Grotesk",
            -apple-system,
            sans-serif;
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 18px 10px;
    }

    .card-title-group {
        display: flex;
        flex-direction: column;
    }

    .card-title {
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
    }

    .card-subtitle {
        font-size: 10.5px;
        color: #00f0ff;
        font-family: "JetBrains Mono", monospace;
        margin-top: 2px;
        font-weight: 600;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .view-toggle {
        display: flex;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 7px;
        overflow: hidden;
    }

    .toggle-btn {
        background: transparent;
        border: none;
        color: #7c93ad;
        font-size: 11px;
        font-family: "JetBrains Mono", monospace;
        font-weight: 600;
        padding: 4px 10px;
        cursor: pointer;
        transition: all 0.18s ease;
    }

    .toggle-btn.active-toggle {
        background: rgba(0, 240, 255, 0.12);
        color: #00f0ff;
    }

    .card-close-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        cursor: pointer;
        width: 26px;
        height: 26px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .card-close-btn:hover {
        color: #ffffff;
        background: rgba(244, 63, 94, 0.3);
        border-color: rgba(244, 63, 94, 0.6);
    }

    .morph-bar {
        height: 2px;
        width: 100%;
        transition: background-color 0.3s ease;
    }

    /* Card Body — Flow View */
    .card-body {
        display: flex;
        padding: 14px 18px;
        gap: 14px;
        flex: 1;
        overflow-y: auto;
    }

    .numeral-rail {
        display: flex;
        flex-direction: column;
        gap: 3px;
        width: 40px;
        flex-shrink: 0;
    }

    .numzone {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 3px 2px;
        cursor: pointer;
    }

    .bar-accent {
        width: 3px;
        height: 16px;
        border-radius: 2px;
        transition: background-color 0.2s ease;
    }

    .numeral {
        font-family: "JetBrains Mono", monospace;
        font-size: 10px;
        font-weight: 700;
        transition: color 0.2s ease;
    }

    .content-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 9px;
    }

    .step-head {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .step-badge {
        font-family: "JetBrains Mono", monospace;
        font-size: 9px;
        font-weight: 700;
        color: #07111b;
        padding: 2px 6px;
        border-radius: 4px;
    }

    .step-main-title {
        font-size: 13px;
        font-weight: 700;
        color: #ffffff;
    }

    .step-sub {
        font-size: 10.5px;
        color: #94a3b8;
        font-family: "JetBrains Mono", monospace;
        margin-top: -4px;
    }

    .content-body {
        font-size: 11.5px;
        line-height: 1.55;
        color: #cbd5e1;
        background: rgba(2, 6, 17, 0.75);
        padding: 9px 11px;
        border-radius: 6px;
        border-left: 3px solid var(--active-accent-color);
    }

    .content-body p {
        margin: 0;
    }

    .comp-box-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 7px;
    }

    .comp-item {
        background: rgba(2, 6, 17, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 6px;
        padding: 7px 9px;
    }

    .plc-border {
        border-top: 2px solid #f59e0b;
    }
    .iot-border {
        border-top: 2px solid #38bdf8;
    }
    .insite-border {
        border-top: 2px solid #10b981;
    }

    .comp-item-title {
        font-size: 9px;
        font-weight: 700;
        color: #7c93ad;
        font-family: "JetBrains Mono", monospace;
        text-transform: uppercase;
        margin-bottom: 3px;
    }

    .comp-item-val {
        font-size: 10.5px;
        color: #e2e8f0;
        font-family: "JetBrains Mono", monospace;
        line-height: 1.4;
    }

    .impact-note-box {
        background: rgba(3, 10, 24, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 9px 11px;
        border-radius: 6px;
        max-height: 160px;
        overflow-y: auto;
    }

    .impact-note-box::-webkit-scrollbar {
        width: 4px;
    }
    .impact-note-box::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 4px;
    }

    .impact-title {
        font-weight: 700;
        font-size: 10.5px;
        font-family: "JetBrains Mono", monospace;
        display: block;
        margin-bottom: 6px;
    }

    .impact-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .impact-list li {
        padding-left: 8px;
        border-left: 2px solid rgba(255, 255, 255, 0.12);
    }

    .impact-div-tag {
        font-family: "JetBrains Mono", monospace;
        font-weight: 700;
        font-size: 9px;
        text-transform: uppercase;
        display: block;
        margin-bottom: 1px;
    }

    .impact-desc {
        font-size: 11px;
        color: #cbd5e1;
        line-height: 1.4;
    }

    /* Summary View */
    .summary-view {
        flex: 1;
        overflow-y: auto;
        padding: 14px 18px 18px;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .summary-view::-webkit-scrollbar {
        width: 4px;
    }
    .summary-view::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.12);
        border-radius: 4px;
    }

    .summary-section {
        background: rgba(2, 6, 17, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 8px;
        padding: 12px 14px;
    }

    .summary-section-title {
        font-size: 12.5px;
        font-weight: 700;
        color: #e2e8f0;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 7px;
    }

    .summary-icon {
        font-size: 15px;
    }

    .summary-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .summary-list li {
        font-size: 11.5px;
        color: #94a3b8;
        line-height: 1.45;
        padding-left: 12px;
        position: relative;
    }

    .summary-list li::before {
        content: "›";
        position: absolute;
        left: 0;
        color: #00f0ff;
        font-weight: 700;
    }
</style>
