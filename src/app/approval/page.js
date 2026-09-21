"use client";

import { useState, useEffect } from "react";

export default function ApprovalPage() {
  const [activeTab, setActiveTab] = useState("pengajuan");
  const [timeString, setTimeString] = useState("");

  const [pendingRequests, setPendingRequests] = useState([
    { id: "REQ-001", user: "User_1", item: "Lightstick NCT Neobong", price: "Rp 100.000 / 2 Hari", time: "10 Menit lalu" },
    { id: "REQ-002", user: "User_2", item: "Lightstick NCT Neobong", price: "Rp 100.000 / 2 Hari", time: "10 Menit lalu" },
    { id: "REQ-003", user: "User_3", item: "Lightstick NCT Neobong", price: "Rp 100.000 / 2 Hari", time: "10 Menit lalu" },
    { id: "REQ-004", user: "User_4", item: "Lightstick NCT Neobong", price: "Rp 100.000 / 2 Hari", time: "10 Menit lalu" },
    { id: "REQ-005", user: "User_5", item: "Lightstick NCT Neobong", price: "Rp 100.000 / 2 Hari", time: "10 Menit lalu" },
    { id: "REQ-006", user: "User_6", item: "Lightstick NCT Neobong", price: "Rp 100.000 / 2 Hari", time: "10 Menit lalu" },
  ]);

  // Jam Digital Real-time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString("id-ID"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id) => {
    setPendingRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = (id) => {
    setPendingRequests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* SECTION ATAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* KOLOM KIRI (Super Admin, Tanggal, Jam) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-pink-400 flex items-center justify-center text-pink-600 font-black text-base bg-pink-50">
                ADM
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Super Admin</h2>
                <p className="text-xs text-gray-400 mb-1">admin@bonggoo.com</p>
                <span className="bg-emerald-100 text-emerald-600 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                  Online
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                TANGGAL HARI INI
              </p>
              <p className="text-base font-extrabold text-gray-800">
                Senin, 21 September 2026
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                JAM DIGITAL
              </p>
              <p className="text-2xl font-black text-[#FF0055] tracking-wider">
                {timeString || "11:54:03"}
              </p>
            </div>
          </div>

          {/* KOLOM KANAN (Header Merah & List Admin) */}
          <div className="lg:col-span-8 space-y-3 flex flex-col justify-between">
            <div className="bg-[#FF0055] p-7 rounded-2xl text-white shadow-sm">
              <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">
                ITS BONGGO ADMIN!
              </h1>
              <p className="text-xs opacity-90 font-medium">
                Panel Kelola Operasional & Penyewaan Lightstick
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Daftar Nama Admin Lainnya
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-gray-50/80 px-4 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    <span className="font-bold text-gray-800">Admin 1 - Intan</span>
                    <span className="text-gray-400">(Verifikasi KTP)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                    Online
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50/80 px-4 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    <span className="font-bold text-gray-800">Admin 2 - Rizky</span>
                    <span className="text-gray-400">(Kelola Stok)</span>
                  </div>
                  <span className="bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                    Offline
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50/80 px-4 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    <span className="font-bold text-gray-800">Admin 3 - Sarah</span>
                    <span className="text-gray-400">(Customer Service)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TAB NAVBAR */}
        <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-xs flex gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("pengajuan")}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === "pengajuan"
                ? "bg-[#FF0055] text-white font-bold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Daftar Pengajuan
          </button>
          <button
            onClick={() => setActiveTab("crud")}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === "crud"
                ? "bg-[#FF0055] text-white font-bold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            CRUD (Kelola Produk)
          </button>
          <button
            onClick={() => setActiveTab("grafik")}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === "grafik"
                ? "bg-[#FF0055] text-white font-bold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Grafik Penjualan
          </button>
          <button
            onClick={() => setActiveTab("pemasukan")}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === "pemasukan"
                ? "bg-[#FF0055] text-white font-bold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Pemasukan (Bulanan)
          </button>
        </div>

        {/* DAFTAR PENGAJUAN (GRID 4 KOLOM) */}
        {activeTab === "pengajuan" && (
          <div className="space-y-3 pt-1">
            <h2 className="text-base font-bold text-gray-900">
              Daftar Pengajuan Sewa (Masuk)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-pink-50 text-[#FF0055] text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {req.id}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {req.time}
                      </span>
                    </div>

                    <h3 className="font-bold text-xs text-gray-900">
                      {req.user}
                    </h3>
                    <p className="text-[11px] text-gray-500 mb-1">
                      {req.item}
                    </p>
                    <p className="text-xs font-bold text-[#FF0055]">
                      {req.price}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="flex-1 bg-[#00C853] hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex-1 bg-[#FFEBF0] hover:bg-pink-200 text-[#FF0055] text-xs font-bold py-2 rounded-xl transition"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}