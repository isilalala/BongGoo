// src/app/status/page.js
"use client";

import { useEffect, useState } from "react";
import Badge from "../../components/Badge";
import { apiFetch } from "../../lib/api";

export default function StatusPage() {
  const [rentals, setRentals] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken") || localStorage.getItem("token")
          : null;
      const userString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const currentUser = userString ? JSON.parse(userString) : {};

      const currentUserId =
        currentUser.Id ||
        currentUser.id ||
        currentUser.ID ||
        currentUser.User_id ||
        currentUser.user_id ||
        currentUser.UUID ||
        currentUser.uuid;

      const loggedInUsername = currentUser.username || currentUser.name || currentUser.Username || "";

      const checkAdmin =
        userRole?.toLowerCase() === "admin" ||
        loggedInUsername.toUpperCase().includes("ADMIN");
      setIsAdmin(checkAdmin);

      const extractArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.data)) return data.data;
        if (Array.isArray(data.result)) return data.result;
        if (Array.isArray(data.payload)) return data.payload;
        return [];
      };

      const [resLoans, resLightsticks] = await Promise.all([
        apiFetch("/loans", { token }).catch(() => []),
        apiFetch("/lightsticks", { token }).catch(() => []),
      ]);

      const rawLoans = extractArray(resLoans);
      const rawLightsticks = extractArray(resLightsticks);

      const lightstickMap = {};
      rawLightsticks.forEach((ls) => {
        const lsId = ls.Id ?? ls.id ?? ls.ID;
        if (lsId !== undefined) {
          lightstickMap[String(lsId)] = ls;
        }
      });

      const mergedLoans = rawLoans.map((loan) => {
        const lsId = loan.Lightstick_id ?? loan.lightstick_id ?? loan.lightstickId;
        const matchedLs = lightstickMap[String(lsId)] || {};

        return {
          ...loan,
          Nama_unit:
            loan.Nama_unit ??
            loan.nama_unit ??
            loan.lightstick_name ??
            matchedLs.Nama_unit ??
            matchedLs.nama_unit ??
            matchedLs.name ??
            "Lightstick K-Pop",
          grup_nama:
            loan.grup_nama ??
            loan.Nama_grup ??
            loan.group_name ??
            matchedLs.grup_nama ??
            matchedLs.Nama_grup ??
            matchedLs.group_name ??
            "K-POP",
        };
      });

      // Filter presisi khusus user biasa
      if (!checkAdmin) {
        if (currentUserId) {
          const userLoans = mergedLoans.filter((item) => {
            const itemUserId =
              item.User_id ??
              item.user_id ??
              item.userId ??
              item.User_ID ??
              item.id_user;

            return (
              itemUserId !== undefined &&
              String(itemUserId).toLowerCase().trim() === String(currentUserId).toLowerCase().trim()
            );
          });
          setRentals(userLoans);
        } else {
          setRentals([]);
        }
      } else {
        setRentals(mergedLoans);
      }
    } catch (error) {
      console.error("Gagal memuat data loans:", error);
      setErrorMsg(error.message || "Gagal mengambil data dari server API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");

      await apiFetch(`/loans/${id}`, {
        method: "PATCH",
        token: token,
        body: {
          Status: newStatus,
          status: newStatus,
        },
      });

      loadData();
    } catch (error) {
      console.error("Gagal mengupdate status via API:", error);
      alert(error.message || "Gagal memperbarui status transaksi!");
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white pt-12 md:pt-16 pb-12 px-4 flex flex-col items-center justify-center font-sans">
        <p className="text-sm font-semibold opacity-80">Memuat status peminjaman...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white pt-12 md:pt-16 pb-12 px-4 flex flex-col items-center font-sans">
      <div className="max-w-4xl mx-auto w-full pt-10 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-100 drop-shadow-md mb-2">
          {isAdmin ? "Status Peminjaman Pengguna" : "Status Peminjaman Saya"}
        </h1>
        <p className="text-xs md:text-sm text-white mb-8">
          {isAdmin
            ? "Kelola dan tentukan persetujuan peminjaman dari semua pengguna."
            : "Pantau persetujuan dan riwayat peminjaman lightstick kamu."}
        </p>
      </div>

      {errorMsg && (
        <div className="max-w-4xl w-full mb-4 p-3 bg-red-500/80 backdrop-blur-md text-white text-xs rounded-xl text-center font-medium">
          {errorMsg}
        </div>
      )}

      <div className="max-w-4xl w-full space-y-4">
        {isLoading ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/20">
            <p className="text-sm font-semibold text-white animate-pulse">
              Memuat data riwayat dari server API...
            </p>
          </div>
        ) : rentals && rentals.length > 0 ? (
          rentals.map((rental, index) => {
            const rentalId = rental.Id ?? rental.id ?? rental.ID ?? index;
            const groupName =
              rental.grup_nama ??
              rental.groupName ??
              rental.group_name ??
              rental.Nama_grup ??
              rental.group ??
              "K-POP";
            const itemName =
              rental.Nama_unit ??
              rental.nama_unit ??
              rental.itemName ??
              rental.item_name ??
              rental.lightstick_name ??
              rental.name ??
              "Lightstick";
            const username =
              rental.username ??
              rental.user_name ??
              rental.Nama_peminjam ??
              rental.user ??
              "User";
            const startDate =
              rental.Tanggal_pinjam ??
              rental.start_date ??
              rental.startDate ??
              rental.tanggal_pinjam ??
              rental.date ??
              "-";
            const daysCount =
              rental.Durasi ?? rental.durasi ?? rental.days ?? 1;
            const eventName =
              rental.Nama_event ??
              rental.event_name ??
              rental.eventName ??
              rental.event ??
              "";
            const status =
              rental.Status ??
              rental.status ??
              rental.Status_peminjaman ??
              "PENDING";

            return (
              <div
                key={rentalId}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-800"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full uppercase">
                      {groupName}
                    </span>
                    <span className="text-xs text-gray-500">ID Loan: {rentalId}</span>
                  </div>

                  <h2 className="font-bold text-gray-800 text-lg">
                    {itemName}
                  </h2>

                  {isAdmin && (
                    <p className="text-xs font-bold text-pink-600 mt-1">
                      👤 Peminjam: {username}
                    </p>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    📅 Tanggal Pinjam: {startDate} ({daysCount} Hari)
                  </p>

                  {eventName && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      🎟️ Event: {eventName}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <Badge status={status} />

                  {isAdmin && status.toUpperCase() === "PENDING" && (
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleUpdateStatus(rentalId, "APPROVED")}
                        className="bg-[#00C853] hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(rentalId, "REJECTED")}
                        className="bg-[#FFEBF0] hover:bg-pink-200 text-[#FF0055] text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
                      >
                        Tolak
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/20">
            <p className="text-sm font-semibold text-white">
              {isAdmin
                ? "Belum ada pengajuan peminjaman dari pengguna."
                : "Belum ada riwayat peminjaman."}
            </p>
            <p className="text-xs text-blue-100 mt-1">
              {isAdmin
                ? "Data peminjaman pengguna akan otomatis muncul di sini."
                : "Silakan ajukan peminjaman lightstick terlebih dahulu di halaman Peminjaman."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}