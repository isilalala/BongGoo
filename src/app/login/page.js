// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("masuk");

  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [regNama, setRegNama] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regHp, setRegHp] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regNik, setRegNik] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const ADMIN_USER = "admin";
  const ADMIN_EMAIL = "admin@bonggoo.com";
  const ADMIN_PASS = "admin123";

  // --- HANDLER LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const formattedUser = loginUser.trim().toLowerCase();

    // 1. Validasi Admin
    if (
      (formattedUser === ADMIN_USER || formattedUser === ADMIN_EMAIL) &&
      loginPassword === ADMIN_PASS
    ) {
      // Simpan credentials admin ke localStorage
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("authToken", "token-admin-123"); // Ditambahkan agar Navbar mendeteksi login
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "admin", role: "admin" })
      );

      // Trigger custom event untuk Navbar
      window.dispatchEvent(new Event("authChange"));

      // Arahkan & refresh halaman ke Dashboard Approval Admin
      router.push("/approval");
      router.refresh();
      return;
    }

    // 2. Validasi User Biasa
    if (formattedUser && loginPassword.length >= 4) {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("authToken", `token-${loginUser}`); // Ditambahkan untuk user biasa
      localStorage.setItem(
        "user",
        JSON.stringify({ username: loginUser, role: "user" })
      );

      // Trigger custom event untuk Navbar
      window.dispatchEvent(new Event("authChange"));

      // Diarahkan ke Beranda
      router.push("/");
      router.refresh();
      return;
    } else {
      setErrorMsg("Username/Email atau Password tidak valid!");
      return;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegisterSuccess(true);
  };

  const handleCloseModal = () => {
    setLoginUser(regEmail || regUsername);
    setIsRegisterSuccess(false);
    setActiveTab("masuk");
  };

  return (
    <div className="w-full min-h-screen h-screen py-10 px-4 bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/fandom-kpop.jpg')" }}
      />
      <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-gray-200 shadow-2xl w-full max-w-md relative">
        <button
          onClick={() => router.push("/")}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold text-lg transition cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-pink-600 tracking-tight">
            BongGoo
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Sewa Lightstick Konser K-Pop
          </p>
        </div>

        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("masuk");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "masuk"
                ? "bg-white text-pink-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("daftar");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "daftar"
                ? "bg-white text-pink-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Daftar Akun
          </button>
        </div>

        {activeTab === "masuk" && (
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium">
                {errorMsg}
              </div>
            )}

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
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
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
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-4 py-3.5"
            >
              Masuk
            </Button>
          </form>
        )}

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
                value={regNama}
                onChange={(e) => setRegNama(e.target.value)}
                placeholder="Nama sesuai KTP"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
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
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="username"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  No. HP / WA
                </label>
                <input
                  type="text"
                  required
                  value={regHp}
                  onChange={(e) => setRegHp(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
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
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                NIK
              </label>
              <input
                type="text"
                required
                value={regNik}
                onChange={(e) => setRegNik(e.target.value)}
                placeholder="16 digit NIK"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Upload Foto Identitas (KTP)
              </label>
              <input
                type="file"
                required
                accept="image/*"
                className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-4 py-3.5"
            >
              Daftar Sekarang
            </Button>
          </form>
        )}
      </div>

      {isRegisterSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 text-center max-w-sm w-full shadow-2xl border border-gray-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Pendaftaran Berhasil!
            </h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              Akun kamu berhasil terdaftar. Silakan masuk menggunakan username/email dan password.
            </p>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleCloseModal}
            >
              Lanjut ke Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}