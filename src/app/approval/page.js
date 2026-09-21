"use client";

import { useState, useEffect } from "react";
import Badge from "../../components/Badge";

export default function ApprovalPage() {
  const [timeString, setTimeString] = useState("");
  const [requests, setRequests] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load data real dari localStorage (borrowRequests)
  const loadRequests = () => {
    try {
      const requestsString = localStorage.getItem("borrowRequests");
      const allRequests = requestsString ? JSON.parse(requestsString) : [];
      setRequests(Array.isArray(allRequests) ? allRequests : []);
    } catch (error) {
      console.error("Gagal memuat data pengajuan:", error);
      setRequests([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      loadRequests();
    }, 0);

    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString("id-ID"));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    window.addEventListener("storage", loadRequests);

    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
      window.removeEventListener("storage", loadRequests);
    };
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    try {
      const requestsString = localStorage.getItem("borrowRequests");
      const allRequests = requestsString ? JSON.parse(requestsString) : [];

      const updatedRequests = allRequests.map((item) => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      });

      localStorage.setItem("borrowRequests", JSON.stringify(updatedRequests));

      window.dispatchEvent(new Event("storage"));
      loadRequests();
    } catch (error) {
      console.error("Gagal mengupdate status:", error);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] p-8 flex items-center justify-center font-sans text-gray-600">
        Memuat panel admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* SECTION ATAS HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* KOLOM KIRI (Profile Admin, Tanggal, Jam) */}
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
                {timeString || "16:00:00"}
              </p>
            </div>
          </div>

          {/* KOLOM KANAN (Banner Merah Utama) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="bg-[#FF0055] p-8 rounded-2xl text-white shadow-sm h-full flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 uppercase">
                ITS BONGGO ADMIN!
              </h1>
              <p className="text-sm opacity-90 font-medium max-w-xl">
                Panel Kontrol Operasional & Pengelolaan Persetujuan Penyewaan Lightstick K-Pop.
              </p>
            </div>
          </div>

        </div>

        {/* DAFTAR PENGAJUAN DATA REAL */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-gray-900">
              Daftar Pengajuan Sewa Lightstick ({requests.length})
            </h2>
          </div>

          {requests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {requests.map((req, index) => (
                <div
                  key={req.id || index}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-pink-50 text-[#FF0055] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                        {req.groupName || req.group || "K-POP"}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        {req.id}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-gray-900">
                      {req.itemName || req.item}
                    </h3>
                    <p className="text-xs font-semibold text-pink-600 mt-0.5">
                      👤 Peminjam: {req.username || req.user || "User"}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      📅 {req.startDate ? `${req.startDate} (${req.days} Hari)` : req.date}
                    </p>
                    {req.eventName && (
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        🎟️ {req.eventName}
                      </p>
                    )}
                    {req.totalBiaya && (
                      <p className="text-xs font-extrabold text-gray-900 mt-2">
                        Rp {Number(req.totalBiaya).toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        Status:
                      </span>
                      <Badge status={req.status || "Pending"} />
                    </div>

                    {(req.status === "Pending" || req.status === "PENDING") && (
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleUpdateStatus(req.id, "Approved")}
                          className="flex-1 bg-[#00C853] hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition cursor-pointer"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "Rejected")}
                          className="flex-1 bg-[#FFEBF0] hover:bg-pink-200 text-[#FF0055] text-xs font-bold py-2 rounded-xl transition cursor-pointer"
                        >
                          Tolak
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm font-bold text-gray-700">
                Belum ada pengajuan peminjaman dari pengguna.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Setiap transaksi peminjaman baru dari user akan otomatis tampil di panel ini secara real-time.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}