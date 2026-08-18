export const mdcw = {
    id: "MDCW&SP",
    name: "MDCW&SP",
    class: "produksi",
    color: "#6366f1",
    pin: { row: 30, col: 24 },
    card: {
        title: "MDCW & Secondary Packing (SP)",
        subtitle: "Metal Detector, Check Weigher & Karton SP",
        position: "top-left",
        metrics: [
            {
                label: "Notion",
                value: "Ide & Teknis",
                color: "#6366f1",
                info: `MDCW & Secondary Packing (SP) adalah dua tahap terakhir sebelum produk masuk ke gudang jadi.
<br>
<b style='color:#10b981'>1. MDCW — Sniffing Pasif Modbus RTU RS485:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>Non-intrusive sniffing:</b> Data dari Metal Detector dan Check Weigher ditangkap pasif dari jalur komunikasi mesin — tidak ada yang diutak-atik, sistem vendor tidak terganggu sama sekali.</li>
    <li><b>Auto-Rejector:</b> Produk langsung di-reject secara otomatis kalau berat tidak sesuai atau ada indikasi kontaminasi logam. Tidak perlu tunggu sampling QC untuk tindakan.</li>
</ul>
<b style='color:yellow'>2. Secondary Packing (SP):</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li><b>Pengemasan ke Karton Master:</b> Produk kemasan primer yang lolos MDCW dibungkus ke dalam karton/dus master.</li>
    <li><b>Label Barcode Secondary:</b> Setiap karton ditempeli Barcode Secondary yang menghubungkan hierarki dari Primary QR ke level karton — rantai traceability lengkap sampai level pengiriman.</li>
</ul>`
            },
            {
                label: "Impact",
                value: "Dampak Sistem",
                color: "#10b981",
                info: `<b>Kenapa ini penting untuk bisnis:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li>Garansi 100% bebas kontaminasi logam dan berat presisi sebelum produk masuk karton — kalau ada yang tidak sesuai, sudah di-reject sebelum sampai ke konsumen.</li>
    <li>Reject rate per shift tercatat otomatis — bisa dihitung cost of quality nyata per batch, bukan hanya total waste yang tidak jelas asalnya dari mana.</li>
</ul>
<b>Lintas divisi:</b>
<ul style='margin-left:16px;margin-top:4px;margin-bottom:8px;'>
    <li><b>QC:</b> Data reject MDCW vs laporan manual QC bisa dibandingkan — kalau ada gap yang besar, itu tanda ada yang perlu diperiksa di prosedur sampling.</li>
    <li><b>WHFG & Logistik:</b> Hierarki Primary QR → Secondary Barcode karton memudahkan penelusuran batch sampai ke level dus tanpa bongkar seluruh kiriman.</li>
</ul>
<b>Di lapangan:</b>
<ul style='margin-left:16px;margin-top:4px;'>
    <li>Rejector bekerja otomatis — operator tidak perlu seleksi manual satu per satu. Cetak label karton juga otomatis, alur SP lebih cepat.</li>
</ul>`
            }
        ]
    },
    cells: [
        { fromRow: 14, toRow: 14, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 14, toRow: 14, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 20, toRow: 20, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 20, toRow: 20, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 25, toRow: 25, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 25, toRow: 25, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 31, toRow: 31, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 31, toRow: 31, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 38, toRow: 38, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 38, toRow: 38, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 43, toRow: 43, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 43, toRow: 43, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 48, toRow: 48, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 48, toRow: 48, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 53, toRow: 53, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 53, toRow: 53, fromCol: 24, toCol: 25, height: 5, color: "#10b981" },
        { fromRow: 58, toRow: 58, fromCol: 21, toCol: 22, height: 8, color: "#f97316" },
        { fromRow: 58, toRow: 58, fromCol: 24, toCol: 25, height: 5, color: "#10b981" }
    ]
};
