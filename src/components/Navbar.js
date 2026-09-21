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
    // Fungsi untuk cek status auth pengguna dari localStorage
    const checkAuthStatus = () => {
      const role = localStorage.getItem("userRole");
      const userStorage = localStorage.getItem("user");

      if (role) {
        setIsLoggedIn(true);
        setUserRole(role);

        if (userStorage) {
          try {
            const parsedUser = JSON.parse(userStorage);
            setUsername(
              parsedUser.username || parsedUser.name || parsedUser.email || "User"
            );
          } catch (e) {
            setUsername("User");
          }
        } else {
          setUsername("User");
        }
      } else {
        setIsLoggedIn(false);
        setUsername("");
        setUserRole("user");
      }
    };

    // Jalankan pertama kali saat komponen di-mount
    checkAuthStatus();

    // Listener event authChange
    window.addEventListener("authChange", checkAuthStatus);
    return () => {
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  // Handler Logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    setUsername("");

    // Trigger update status auth
    window.dispatchEvent(new Event("authChange"));

    // Navigasi ke Landing Page
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

          {/* Menu Peminjaman & Status HANYA TAMPIL Jika Sudah Login */}
          {isLoggedIn && (
            <>
              {userRole === "admin" ? (
                <Link
                  href="/approval"
                  className={`transition ${
                    pathname === "/approval" ? "text-pink-600 font-extrabold" : "hover:text-gray-800"
                  }`}
                >
                  Persetujuan Peminjaman
                </Link>
              ) : (
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
            </>
          )}
        </div>

        {/* BAGIAN KANAN: LOGIN / PROFILE & LOGOUT */}
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