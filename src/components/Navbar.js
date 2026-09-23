// src/components/Navbar.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const checkAuthStatus = () => {
      const role = localStorage.getItem("userRole");
      const userStorage = localStorage.getItem("user");
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");

      let currentName = "";
      if (userStorage) {
        try {
          const parsedUser = JSON.parse(userStorage);
          currentName = parsedUser.username || parsedUser.name || parsedUser.email || "";
        } catch (e) {
          currentName = "";
        }
      }

      // Deteksi otomatis jika akun adalah Admin
      const isAdminAccount = 
        role === "admin" || 
        currentName.toUpperCase().includes("ADMIN") || 
        (userStorage && userStorage.toUpperCase().includes("ADMIN"));

      if (role || token || currentName) {
        setIsLoggedIn(true);
        setUsername(currentName || "User");
        setUserRole(isAdminAccount ? "admin" : "user");
      } else {
        setIsLoggedIn(false);
        setUsername("");
        setUserRole("user");
      }
    };

    checkAuthStatus();

    window.addEventListener("authChange", checkAuthStatus);
    window.addEventListener("storage", checkAuthStatus);
    return () => {
      window.removeEventListener("authChange", checkAuthStatus);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    setUsername("");
    setUserRole("user");

    window.dispatchEvent(new Event("authChange"));

    router.push("/");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-xs sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO BONGGOO */}
        <Link href="/" className="flex items-center gap-1.5 text-2xl font-black text-pink-600 tracking-tight">
          BongGoo <span className="text-pink-500">💖</span>
        </Link>

        {/* MENU NAVIGASI TENGAH */}
        <div className="flex items-center gap-8 text-xs font-bold text-gray-500">
          <Link
            href="/"
            className={`transition ${
              pathname === "/" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
            }`}
          >
            Beranda
          </Link>

          <Link
            href="/"
            className={`transition ${
              pathname === "/" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
            }`}
          >
            Kontak
          </Link>

          {/* Menu Khusus USER BIASA (Peminjaman & Status) */}
          {isLoggedIn && userRole !== "admin" && (
            <>
              <Link
                href="/peminjaman"
                className={`transition ${
                  pathname === "/peminjaman" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
                }`}
              >
                Peminjaman
              </Link>
              <Link
                href="/status"
                className={`transition ${
                  pathname === "/status" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
                }`}
              >
                Status
              </Link>
            </>
          )}

          {/* Menu Khusus ADMIN (Status & Approval) */}
          {isLoggedIn && userRole === "admin" && (
            <>
              <Link
                href="/status"
                className={`transition ${
                  pathname === "/status" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
                }`}
              >
                Approval
              </Link>
              <Link
                href="/approval"
                className={`transition ${
                  pathname === "/approval" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
                }`}
              >
                Admin
              </Link>
            </>
          )}
        </div>

        {/* BAGIAN KANAN: PROFILE & LOGOUT */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-pink-50/60 border border-pink-100 px-3.5 py-1.5 rounded-full">
              <span className="text-xs font-bold text-pink-700 flex items-center gap-1">
                👤 {username}
              </span>
              <span className="text-gray-300">|</span>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-sm transition"
            >
              Masuk / Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}