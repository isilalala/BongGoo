// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("masuk");

  // State Login
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);

  // State Register
  const [regNama, setRegNama] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regHp, setRegHp] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regNik, setRegNik] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Toggle Password Visibility
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

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
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("authToken", "token-admin-123");
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "admin", role: "admin" })
      );

      window.dispatchEvent(new Event("authChange"));
      router.push("/approval");
      return;
    }

    // 2. Validasi User Biasa
    if (formattedUser && loginPassword.length >= 4) {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("authToken", `token-${loginUser}`);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: loginUser, role: "user" })
      );

      window.dispatchEvent(new Event("authChange"));
      router.push("/");
      return;
    } else {
      setErrorMsg("Username/Email atau Password tidak valid!");
      return;
    }
  };

  // --- HANDLER REGISTER DENGAN VALIDASI STRATA ---
  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validasi No. HP (10 - 13 digit angka)
    const hpRegex = /^[0-9]{10,13}$/;
    if (!hpRegex.test(regHp)) {
      setErrorMsg("Nomor HP/WA tidak valid! Harus berupa angka 10-13 digit.");
      return;
    }

    // Validasi NIK (persis 16 digit angka)
    const nikRegex = /^[0-9]{16}$/;
    if (!nikRegex.test(regNik)) {
      setErrorMsg("NIK tidak valid! Harus tepat 16 digit angka.");
      return;
    }

    // Validasi Panjang Password
    if (regPassword.length < 6) {
      setErrorMsg("Password minimal 6 karakter!");
      return;
    }

    // Validasi Kesesuaian Password & Konfirmasi Password
    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok dengan password!");
      return;
    }

    // Jika semua validasi lolos
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

        {/* TAB NAVIGATION */}
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

        {/* FORM MASUK */}
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
              <div className="relative">
                <input
                  type={showLoginPass ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  {showLoginPass ? "🙈" : "👁️"}
                </button>
              </div>
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

        {/* FORM DAFTAR */}
        {activeTab === "daftar" && (
          <form
            onSubmit={handleRegister}
            className="space-y-3.5 max-h-96 overflow-y-auto pr-1"
          >
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium">
                {errorMsg}
              </div>
            )}

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
                  onChange={(e) => setRegHp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="0812xxxxxxxx (10-13 digit)"
                  maxLength={13}
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
                NIK (16 Digit)
              </label>
              <input
                type="text"
                required
                value={regNik}
                onChange={(e) => setRegNik(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Masukkan 16 digit NIK"
                maxLength={16}
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50"
              />
            </div>

            {/* FIELD PASSWORD & TOGGLE LIHAT */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showRegPass ? "text" : "password"}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPass(!showRegPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  {showRegPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* FIELD KONFIRMASI PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showRegConfirmPass ? "text" : "password"}
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Ulangi password di atas"
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowRegConfirmPass(!showRegConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  {showRegConfirmPass ? "🙈" : "👁️"}
                </button>
              </div>
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

      {/* MODAL SUCCESS */}
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