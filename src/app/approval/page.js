// app/approval/page.js
"use client";

import { useState, useEffect } from "react";
import Badge from "../../components/Badge";
import { apiFetch } from "../../lib/api";

export default function ApprovalPage() {
  const [timeString, setTimeString] = useState("");
  const [requests, setRequests] = useState([]);
  const [lightsticks, setLightsticks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      if (!token) {
        setErrorMsg("Sesi admin tidak ditemukan. Silakan login kembali.");
        setIsLoading(false);
        return;
      }

      const extractArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.data)) return data.data;
        if (Array.isArray(data.result)) return data.result;
        return [];
      };

      const [resLoans, resLightsticks] = await Promise.all([
        apiFetch("/loans", { token }).catch(() => []),
        apiFetch("/lightsticks", { token }).catch(() => []),
      ]);

      const rawLoans = extractArray(resLoans);
      const rawLightsticks = extractArray(resLightsticks);

      setRequests(rawLoans);
      setLightsticks(rawLightsticks);
    } catch (error) {
      console.error("Gagal memuat data dari API:", error);
      setErrorMsg(error.message || "Gagal memuat data dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      loadData();
    }, 0);

    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString("id-ID"));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
    };
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");

      await apiFetch(`/loans/${id}`, {
        method: "PUT",
        token: token,
        body: {
          Status: newStatus.toLowerCase(),
        },
      });

      loadData();
    } catch (error) {
      console.error("Gagal mengupdate status via API:", error);
      alert(error.message || "Gagal memperbarui status transaksi.");
    }
  };

  // KELOMPOK STATISTIK
  const totalLoansCount = requests.length;
  const pendingRequests = requests.filter((r) => (r.Status || "").toLowerCase() === "pending");
  const approvedRequests = requests.filter((r) => (r.Status || "").toLowerCase() === "approved");
  const rejectedRequests = requests.filter((r) => (r.Status || "").toLowerCase() === "rejected");
  const returnedRequests = requests.filter((r) => (r.Status || "").toLowerCase() === "returned");

  const totalStokBarang = lightsticks.reduce((acc, curr) => {
    const stok = curr.Stok ?? curr.stok ?? curr.stock ?? 1;
    return acc + Number(stok);
  }, 0);

  const filteredRequests = requests.filter((req) => {
    const st = (req.Status || "").toLowerCase();
    if (activeFilter === "ALL") return true;
    if (activeFilter === "PENDING") return st === "pending";
    if (activeFilter === "APPROVED") return st === "approved";
    if (activeFilter === "REJECTED") return st === "rejected";
    if (activeFilter === "RETURNED") return st === "returned";
    return true;
  });

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] p-8 flex items-center justify-center font-sans text-gray-600">
        Memuat panel admin...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER PANEL ADMIN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-pink-400 flex items-center justify-center text-pink-600 font-black text-base bg-pink-50">
                ADM
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Super Admin</h2>
                <p className="text-xs text-gray-500 mb-1">admin@bonggoo.com</p>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Online
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  HARI INI
                </p>
                <p className="text-xs font-extrabold text-gray-800">
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  JAM DIGITAL
                </p>
                <p className="text-sm font-black text-[#FF0055]">
                  {timeString || "16:00:00"}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              className="relative overflow-hidden p-8 rounded-2xl text-white shadow-xs h-full flex flex-col justify-center min-h-[170px] border border-white/20 bg-cover bg-center"
              style={{ backgroundImage: "url('/fandom-kpop.jpg')" }}
            >
              <div className="absolute inset-0 bg-[#FF0055]/85 backdrop-blur-[2px]" />

              <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 uppercase drop-shadow-md">
                  ITS BONGGO ADMIN!
                </h1>
                <p className="text-xs md:text-sm opacity-95 font-medium max-w-xl drop-shadow-sm">
                  Panel Kontrol Operasional & Pengelolaan Persetujuan Penyewaan Lightstick K-Pop.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KARTU STATISTIK RINGKASAN */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Total Peminjaman
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-gray-900">{totalLoansCount}</span>
              <span className="text-xs text-blue-500 font-bold">📋 Transaksi</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200/60 bg-amber-50/20 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
              Menunggu Approval
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-600">{pendingRequests.length}</span>
              <span className="text-xs text-amber-500 font-bold">⏳ Pending</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/20 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Diterima / Disetujui
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-600">{approvedRequests.length}</span>
              <span className="text-xs text-emerald-500 font-bold">✓ Approved</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-rose-200/60 bg-rose-50/20 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
              Ditolak
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-rose-600">{rejectedRequests.length}</span>
              <span className="text-xs text-rose-500 font-bold">✕ Rejected</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-indigo-200/60 bg-indigo-50/20 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
              Dikembalikan
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-indigo-600">{returnedRequests.length}</span>
              <span className="text-xs text-indigo-500 font-bold">🔄 Selesai</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-pink-200/60 bg-pink-50/20 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
              Total Stok Barang
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-pink-600">{totalStokBarang}</span>
              <span className="text-xs text-pink-500 font-bold">📦 Unit</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 text-red-600 text-xs rounded-2xl border border-red-100 font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* TAB FILTER STATUS */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-gray-900">
              Daftar Pengajuan Sewa ({filteredRequests.length})
            </h2>

            <div className="flex flex-wrap gap-1.5 bg-gray-200/70 p-1 rounded-xl text-xs font-bold text-gray-600">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeFilter === "ALL" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
                }`}
              >
                Semua ({totalLoansCount})
              </button>
              <button
                onClick={() => setActiveFilter("PENDING")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeFilter === "PENDING" ? "bg-amber-500 text-white shadow-xs" : "hover:text-amber-600"
                }`}
              >
                Pending ({pendingRequests.length})
              </button>
              <button
                onClick={() => setActiveFilter("APPROVED")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeFilter === "APPROVED" ? "bg-emerald-600 text-white shadow-xs" : "hover:text-emerald-600"
                }`}
              >
                Setuju ({approvedRequests.length})
              </button>
              <button
                onClick={() => setActiveFilter("REJECTED")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeFilter === "REJECTED" ? "bg-rose-600 text-white shadow-xs" : "hover:text-rose-600"
                }`}
              >
                Ditolak ({rejectedRequests.length})
              </button>
              <button
                onClick={() => setActiveFilter("RETURNED")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeFilter === "RETURNED" ? "bg-indigo-600 text-white shadow-xs" : "hover:text-indigo-600"
                }`}
              >
                Kembali ({returnedRequests.length})
              </button>
            </div>
          </div>

          {/* LIST PENGAJUAN PINJAM */}
          {isLoading ? (
            <div className="bg-white p-8 rounded-2xl text-center text-pink-600 font-bold text-xs animate-pulse">
              Memuat pengajuan dari API server...
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRequests.map((req, index) => {
                const reqId = req.Id ?? req.id ?? index;
                const itemName = req.lightstick_nama || "Lightstick";
                const username = req.user_nama || "User";
                const startDate = req.Rental_start_date || "-";
                const endDate = req.Rental_end_date || "-";
                const totalPrice = req.Total_price || 0;
                const status = (req.Status || "pending").toLowerCase();

                return (
                  <div
                    key={reqId}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-pink-100 text-[#FF0055] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                          K-POP
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 truncate max-w-[100px]">
                          ID: {reqId}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-gray-900">
                        {itemName}
                      </h3>
                      <p className="text-xs font-semibold text-pink-600 mt-0.5">
                        👤 Peminjam: {username}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">
                        📅 {startDate} s/d {endDate}
                      </p>
                      {totalPrice > 0 && (
                        <p className="text-xs font-extrabold text-gray-900 mt-2">
                          Rp {Number(totalPrice).toLocaleString("id-ID")}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                          Status:
                        </span>
                        <Badge status={status} />
                      </div>

                      {status === "pending" && (
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handleUpdateStatus(reqId, "approved")}
                            className="flex-1 bg-[#00C853] hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition cursor-pointer"
                          >
                            Setujui
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(reqId, "rejected")}
                            className="flex-1 bg-[#FFEBF0] hover:bg-pink-200 text-[#FF0055] text-xs font-bold py-2 rounded-xl transition cursor-pointer"
                          >
                            Tolak
                          </button>
                        </div>
                      )}

                      {status === "approved" && (
                        <button
                          onClick={() => handleUpdateStatus(reqId, "returned")}
                          className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold py-1.5 rounded-xl transition cursor-pointer mt-1"
                        >
                          Tandai Dikembalikan 🔄
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-xs">
              <p className="text-sm font-bold text-gray-700">
                Tidak ada pengajuan peminjaman untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}