import Link from "next/link";

export default function HowToAndFAQ() {
  const steps = [
    {
      no: "01",
      title: "Pilih Lightstick",
      desc: "Cari dan pilih lightstick dari grup K-Pop favoritmu di katalog kami.",
      icon: "🪄",
    },
    {
      no: "02",
      title: "Isi Form Booking",
      desc: "Lengkapi data peminjaman dan tentukan tanggal konser/sewa kamu.",
      icon: "📝",
    },
    {
      no: "03",
      title: "Ambil di Lokasi",
      desc: "Datang ke lokasi kami dengan membawa KTP/KTM asli sebagai jaminan.",
      icon: "📍",
    },
    {
      no: "04",
      title: "Konser & Kembalikan",
      desc: "Nikmati konsermu dan kembalikan lightstick tepat waktu dalam kondisi baik.",
      icon: "🎉",
    },
  ];

  const faqs = [
    {
      q: "Apa saja syarat dokumen untuk menyewa?",
      a: "Kamu wajib menyerahkan 1 dokumen identitas asli (KTP / KTM / Kartu Pelajar) saat proses pengambilan barang sebagai jaminan.",
    },
    {
      q: "Apakah barang dikirim via kurir atau diambil sendiri?",
      a: "Semua lightstick wajib diambil dan dikembalikan langsung di lokasi sekretariat BongGoo (penjemputan fisik).",
    },
    {
      q: "Apakah baterai sudah disediakan?",
      a: "Ya! Setiap penyewaan lightstick sudah termasuk baterai baru siap pakai.",
    },
    {
      q: "Bagaimana jika terjadi keterlambatan pengembalian?",
      a: "Keterlambatan tanpa konfirmasi sebelumnya akan dikenakan denda sesuai dengan ketentuan per jam/hari.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* ================= POIN 2: ALUR PEMINJAMAN ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-pink-600 font-bold text-sm tracking-wider uppercase">
              Proses Mudah
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Cara Peminjaman di BongGoo
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              4 langkah praktis untuk sewa lightstick impianmu tanpa ribet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.no}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition"
              >
                <span className="text-xs font-black text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
                  Langkah {step.no}
                </span>
                <div className="text-4xl my-3">{step.icon}</div>
                <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= POIN 3: SYARAT SEWA & FAQ ================= */}
        <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-pink-600 font-bold text-sm tracking-wider uppercase">
              Pertanyaan Umum
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              Syarat Sewa & Ketentuan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item, idx) => (
              <div key={idx} className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100/60">
                <h3 className="font-bold text-gray-900 text-sm flex items-start gap-2">
                  <span className="text-pink-600">❓</span> {item.q}
                </h3>
                <p className="text-gray-600 text-xs mt-2 pl-6 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Banner Kontak Bantuan Singkat */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-bold text-gray-800 text-sm">Masih ada pertanyaan lain?</p>
              <p className="text-gray-500 text-xs">Hubungi admin untuk tanya lokasi atau detail pengambilan.</p>
            </div>
            <Link
              href="/kontak"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-sm"
            >
              Hubungi Kontak Admin →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}