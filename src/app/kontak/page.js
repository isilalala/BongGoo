"use client";
import Link from "next/link";

export default function KontakPage(){
    return(
       <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header Halaman */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Hubungi Kami & Lokasi Pengambilan</h1>
        <p className="text-gray-600 mt-2">
          Sudah mengajukan peminjaman? Silakan hubungi admin atau datang langsung ke lokasi kami untuk pengambilan barang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom 1: Informasi Kontak Admin & Medsos */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Konfirmasi Booking & Admin</h2>
            <p className="text-sm text-blue-800 mb-4">
              Hubungi Admin untuk konfirmasi nomor booking/peminjaman sebelum datang ke lokasi.
            </p>
            
            <div className="space-y-3 text-gray-700">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20konfirmasi%20pengambilan%20booking" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 border transition"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">WhatsApp Admin</p>
                  <p className="font-bold text-green-600">+62 812-3456-7890</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Telepon / Hotline</p>
                  <p className="font-bold text-gray-800">(0370) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medsos & Jam Operasional */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">⏰ Jam Operasional Pengambilan</h3>
              <p className="text-sm text-gray-600">Senin - Sabtu: 08.00 - 17.00 WITA</p>
              <p className="text-sm text-gray-500">Minggu / Hari Libur: Tutup</p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🌐 Media Sosial</h3>
              <div className="flex gap-4 text-sm text-blue-600">
                <a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a>
                <span>•</span>
                <a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 2: Lokasi Pengambilan (Titik Ambil) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📍 Lokasi Pengambilan Barang</h2>
            <p className="text-sm text-gray-600 mb-4">
              Silakan menunjukkan bukti booking / peminjaman dari aplikasi saat mengambil barang di sekretariat/kantor kami.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-xl text-sm mb-4">
              <p className="font-bold text-gray-800">Sekretariat / Kantor Utama</p>
              <p className="text-gray-600 mt-1">Jl. Majapahit No. 62, Mataram, NTB</p>
            </div>
          </div>

          {/* Placeholder Google Maps Embed */}
          <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden relative flex items-center justify-center text-gray-500 text-sm">
            {/* Kamu bisa ganti div ini dengan <iframe> dari Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.053880470211!2d116.0963!3d-8.5862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzUnMTAuMyJTIDExNsKwMDUnNDYuNyJF!5e0!3m2!1sid!2sid!4v1600000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="mt-4 text-center">
            <Link 
              href="/status" 
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Cek Status Peminjaman Kamu di Sini →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}