// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("masuk"); // "masuk" atau "daftar"

  // State Form Masuk
  const [loginId, setLoginId] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser.toLowerCase() === "admin") {
      localStorage.setItem("userRole", "admin");
    } else {
      localStorage.setItem("userRole", "user");
    }
    alert(`Berhasil masuk!`);
    router.push("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Pendaftaran berhasil! Silakan masuk ke akun Anda.");
    setActiveTab("masuk");
  };

  return (
    <div className="w-full min-h-screen h-screen py-10 px-4 bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/fandom-kpop.jpg')" }}
      />
      <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-gray-200 shadow-2xl w-full max-w-md relative">
        {/* Tombol Close (X) */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold text-lg transition"
        >
          ✕
        </button>

        {/* Header Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-pink-600 tracking-tight">
            BongGoo
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Sewa Lightstick Konser K-Pop
          </p>
        </div>

        {/* Tab Toggle (Masuk / Daftar) */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("masuk")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "masuk"
                ? "bg-white text-pink-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("daftar")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "daftar"
                ? "bg-white text-pink-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Daftar
          </button>
        </div>

        {/* --- FORM MASUK --- */}
        {activeTab === "masuk" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ID <span className="text-pink-600">*</span>
              </label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="CONTOH: BG-26-89412 ATAU BG-ADMIN-01"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Username / Email <span className="text-pink-600">*</span>
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Masukkan username atau email"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password <span className="text-pink-600">*</span>
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth className="mt-2 py-3.5">
              Masuk ke Akun
            </Button>
          </form>
        )}

        {/* --- FORM DAFTAR --- */}
        {activeTab === "daftar" && (
          <form
            onSubmit={handleRegister}
            className="space-y-3.5 max-h-90 overflow-y-auto pr-1"
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                placeholder="Nama sesuai KTP"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="username"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  No. HP / WA
                </label>
                <input
                  type="text"
                  required
                  placeholder="0812xxxxxxxx"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="email@domain.com"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                NIK
              </label>
              <input
                type="text"
                required
                placeholder="16 digit NIK"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Upload Foto Identitas (KTP)
              </label>
              <input
                type="file"
                required
                className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth className="mt-4 py-3.5">
              Daftar Sekarang
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}