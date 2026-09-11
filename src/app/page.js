"use client";

// 1. Import komponen Navbar
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function BerandaPage() {
  return (
    // Tag pembungkus utama
    <main className="relative min-h-screen flex flex-col justify-between">
      
      {/* 2. NAVBAR DITARUH DI SINI (Paling Atas) */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 3. GAMBAR BACKGROUND */}
      <img
        src="/fandom-kpop.jpg" 
        alt="Background K-Pop Lightstick"
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
      />

      {/* 4. HERO SECTION / KONTEN UTAMA */}
      <div className="relative z-10 my-auto text-center p-8">
        <h1 className="text-5xl font-extrabold text-white mb-3 tracking-wide drop-shadow-lg">
          BongGoo
        </h1>
        <p className="text-lg text-gray-200 max-w-xl mx-auto mb-8 drop-shadow">
          Sistem Peminjaman Lightstick
        </p>

        <div className="flex justify-center gap-4">
          <Link 
            href="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
          >
            Masuk ke Akun
          </Link>
          <Link 
            href="/peminjaman" 
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Ajukan Peminjaman
          </Link>
        </div>
      </div>

    </main>
  );
}