// components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  // State untuk menyimpan status login secara dinamis
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [userId, setUserId] = useState("");

  // Pengecekan otomatis saat komponen dimuat / halaman dibuka
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedRole = localStorage.getItem("userRole");
      const savedId = localStorage.getItem("userId");

      if (savedRole && savedId) {
        setIsLoggedIn(true);
        setRole(savedRole);
        setUserId(savedId);
      } else {
        setIsLoggedIn(false);
        setRole("user");
        setUserId("");
      }
    };

    // Jalankan pengecekan pertama kali
    checkAuthStatus();

    // Event listener untuk mendeteksi perubahan localStorage antar halaman
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  // Fungsi Logout / Keluar Sesi
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setRole("user");
    setUserId("");
    alert("Berhasil keluar dari akun.");
    router.push("/login");
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

          {/* Menu ini HANYA tampil jika pengguna SUDAH LOGIN */}
          {isLoggedIn && (
            <>
              <Link href="/peminjaman" className="hover:text-pink-600 transition">
                Peminjaman
              </Link>
              <Link href="/status" className="hover:text-pink-600 transition">
                Status
              </Link>

              {/* Menu Khusus Admin (Hanya tampil jika role admin & sudah login) */}
              {role === "admin" && (
                <Link
                  href="/approval"
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold border border-purple-200 hover:bg-purple-200 transition"
                >
                  Approval
                </Link>
              )}
            </>
          )}
        </div>

        {/* 3. Tombol Akun / Login / Logout (Kanan) */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                role === "admin" ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"
              }`}>
                {role === "admin" ? "🛡️ ADMIN" : "👤 USER"}: {userId}
              </span>

              {/* Tombol Logout untuk keluar dari sesi */}
              <button
                onClick={handleLogout}
                className="text-xs bg-red-50 text-red-600 hover:bg-red-100 font-bold py-1.5 px-3 rounded-xl transition cursor-pointer border border-red-100"
              >
                Keluar
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