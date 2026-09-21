// app/status/page.js
"use client";

import { useEffect, useState } from "react";
import Badge from "../../components/Badge";

export default function StatusPage() {
  const [rentals, setRentals] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fungsi muat data dari localStorage
  const loadData = () => {
    try {
      const userRole = localStorage.getItem("userRole");
      const userString = localStorage.getItem("user");
      const currentUser = userString ? JSON.parse(userString) : {};
      const loggedInUsername = currentUser.username || currentUser.name || "";

      // Cek apakah akun yang login adalah Admin
      const checkAdmin =
        userRole === "admin" ||
        loggedInUsername.toUpperCase().includes("ADMIN");

      setIsAdmin(checkAdmin);

      const requestsString = localStorage.getItem("borrowRequests");
      const allRequests = requestsString ? JSON.parse(requestsString) : [];

      if (Array.isArray(allRequests)) {
        if (checkAdmin) {
          // ADMIN: Tampilkan SEMUA riwayat peminjaman
          setRentals(allRequests);
        } else {
          // USER: Hanya tampilkan milik sendiri
          const myRequests = allRequests.filter(
            (item) => item && item.username === loggedInUsername
          );
          setRentals(myRequests);
        }
      } else {
        setRentals([]);
      }
    } catch (error) {
      console.error("Gagal memuat data dari localStorage:", error);
    }
  };

  useEffect(() => {
    // Dibungkus setTimeout (0ms) agar dimuat secara asinkron (Bebas Peringatan Linter)
    const timer = setTimeout(() => {
      setIsMounted(true);
      loadData();
    }, 0);

    // Listener jika ada pembaruan data di tab lain/action lain
    window.addEventListener("storage", loadData);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  // --- HANDLER UBAH STATUS (SETUJUI / TOLAK) ---
  const handleUpdateStatus = (id, newStatus) => {
    try {
      const requestsString = localStorage.getItem("borrowRequests");
      const allRequests = requestsString ? JSON.parse(requestsString) : [];

      // Update status item dengan ID yang sesuai
      const updatedRequests = allRequests.map((item) => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      });

      // Simpan kembali ke localStorage
      localStorage.setItem("borrowRequests", JSON.stringify(updatedRequests));

      // Picu event update & muat ulang state
      window.dispatchEvent(new Event("storage"));
      loadData();
    } catch (error) {
      console.error("Gagal mengupdate status:", error);
    }
  };

  // Cegah render elemen DOM sebelum client-side mounting selesai
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

      <div className="max-w-4xl w-full space-y-4">
        {rentals && rentals.length > 0 ? (
          rentals.map((rental, index) => (
            <div
              key={rental.id || index}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-800"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full uppercase">
                    {rental.groupName || rental.group || "K-POP"}
                  </span>
                  <span className="text-xs text-gray-500">ID: {rental.id}</span>
                </div>

                <h2 className="font-bold text-gray-800 text-lg">
                  {rental.itemName || rental.item}
                </h2>

                {isAdmin && (
                  <p className="text-xs font-bold text-pink-600 mt-1">
                    👤 Peminjam: {rental.username || rental.user || "User"}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  📅 {rental.startDate ? `${rental.startDate} (${rental.days} Hari)` : rental.date}
                </p>

                {rental.eventName && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    🎟️ Event: {rental.eventName}
                  </p>
                )}
              </div>

              {/* BAGIAN AKSI ADMIN ATAU BADGE USER */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <Badge status={rental.status || "Pending"} />

                {/* Tombol Aksi khusus Admin jika status masih Pending */}
                {isAdmin && (rental.status === "Pending" || rental.status === "PENDING") && (
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleUpdateStatus(rental.id, "Approved")}
                      className="bg-[#00C853] hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(rental.id, "Rejected")}
                      className="bg-[#FFEBF0] hover:bg-pink-200 text-[#FF0055] text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
                    >
                      Tolak
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))
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