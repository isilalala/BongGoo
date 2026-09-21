"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api"; // Path helper API kamu

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [hasOrders, setHasOrders] = useState(false); // State untuk mengecek apakah user punya pesanan

  useEffect(() => {
    async function checkAuthAndOrders() {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");

      if (token) {
        setIsLoggedIn(true);
        setRole(userRole || "user");

        // Cek ke API apakah user punya pesanan aktif/peminjaman
        try {
          const orders = await apiFetch("/rentals"); // atau endpoint /orders sesuai Swagger
          // Jika ada data pesanan (length > 0), setHasOrders(true)
          if (Array.isArray(orders) && orders.length > 0) {
            setHasOrders(true);
          } else {
            setHasOrders(false);
          }
        } catch (err) {
          console.error("Gagal mengecek status pesanan:", err);
          setHasOrders(false);
        }
      } else {
        setIsLoggedIn(false);
        setRole("");
        setHasOrders(false);
      }
    }

    checkAuthAndOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setRole("");
    setHasOrders(false);
    
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 1. Logo Aplikasi */}
        <Link href="/" className="font-extrabold text-xl text-pink-600 tracking-wide">
          BongGoo 💖
        </Link>

        {/* 2. Navigasi Menu Utama */}
        <div className="flex gap-6 items-center text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-pink-600 transition">
            Beranda
          </Link>

          {/* Menu Peminjaman: Muncul jika SUDAH LOGIN */}
          {isLoggedIn && (
            <Link href="/peminjaman" className="hover:text-pink-600 transition">
              Peminjaman
            </Link>
          )}

          {/* Menu Status: HANYA muncul jika SUDAH LOGIN & PUNYA PESANAN */}
          {isLoggedIn && hasOrders && (
            <Link href="/status" className="hover:text-pink-600 transition">
              Status
            </Link>
          )}

          {/* Menu Khusus Admin */}
          {isLoggedIn && role === "admin" && (
            <Link
              href="/approval"
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold border border-purple-200 hover:bg-purple-200 transition"
            >
              Approval
            </Link>
          )}
        </div>

        {/* 3. Tombol Akun / Login */}
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