// components/Navbar.js
"use client";

import Link from "next/link";

export default function Navbar() {
  // Simulasi status login & role user
  // (Nanti bisa diganti dengan state/session autentikasi yang sebenarnya)
  const isLoggedIn = false;
  const role = "user"; // "user" atau "admin"

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 1. Logo Aplikasi (Kiri) */}
        <Link href="/" className="font-extrabold text-xl text-pink-600 tracking-wide">
          BongGoo 💖
        </Link>

        {/* 2. Navigasi Menu Utama (Tengah) */}
        <div className="flex gap-6 items-center text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-pink-600 transition">
            Beranda
          </Link>
          <Link href="/peminjaman" className="hover:text-pink-600 transition">
            Peminjaman
          </Link>
          <Link href="/status" className="hover:text-pink-600 transition">
            Status
          </Link>

          {/* Menu Khusus Admin (Hanya tampil jika role admin) */}
          {role === "admin" && (
            <Link
              href="/approval"
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold border border-purple-200 hover:bg-purple-200 transition"
            >
              Approval
            </Link>
          )}
        </div>

        {/* 3. Tombol Akun / Login (Kanan) */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
                {role.toUpperCase()}
              </span>
              <button className="text-sm font-semibold text-gray-700 hover:text-pink-600">
                Profil
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-pink-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-pink-700 transition shadow-sm"
            >
              Masuk / Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}