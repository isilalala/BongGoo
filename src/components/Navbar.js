"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  // 1. Buat state dinamis untuk status login dan role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // 2. Baca token dan role dari localStorage saat browser memuat komponen
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (token) {
      setIsLoggedIn(true);
      setRole(userRole || "user");
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, []);

  // 3. Fungsi Logout untuk menghapus data di localStorage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setRole("");
    window.location.href = "/login"; // Kembalikan ke halaman login
  };

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

          {/* Menu Peminjaman & Status HANYA tampil jika user SUDAH LOGIN */}
          {isLoggedIn && (
            <>
              <Link href="/peminjaman" className="hover:text-pink-600 transition">
                Peminjaman
              </Link>
              <Link href="/status" className="hover:text-pink-600 transition">
                Status
              </Link>
            </>
          )}

          {/* Menu Khusus Admin (Hanya tampil jika role = "admin") */}
          {isLoggedIn && role === "admin" && (
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
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
              >
                Keluar / Logout
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