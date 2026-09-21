// app/status/page.js
"use client";

import { useEffect, useState } from "react";
import Badge from "../../components/Badge";

export default function StatusPage() {
  const [userRentals, setUserRentals] = useState([]);

  useEffect(() => {
    // Jalankan secara asynchronous agar tidak memicu error synchronous setState
    const loadData = () => {
      try {
        const userString = localStorage.getItem("user");
        const currentUser = userString ? JSON.parse(userString) : {};
        const loggedInUsername = currentUser.username || currentUser.name || "";

        const requestsString = localStorage.getItem("borrowRequests");
        const allRequests = requestsString ? JSON.parse(requestsString) : [];

        const myFilteredRequests = Array.isArray(allRequests)
          ? allRequests.filter((item) => item && item.username === loggedInUsername)
          : [];

        setUserRentals(myFilteredRequests);
      } catch (error) {
        console.error("Gagal memuat data dari localStorage:", error);
      }
    };

    // Panggil fungsi pembacaan data
    loadData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white pt-12 md:pt-16 pb-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full pt-10 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-100 drop-shadow-md mb-2">
          Status Peminjaman Saya
        </h1>
        <p className="text-xs md:text-sm text-white mb-8">
          Pantau persetujuan dan riwayat peminjaman lightstick kamu.
        </p>
      </div>

      <div className="max-w-4xl w-full space-y-4">
        {userRentals && userRentals.length > 0 ? (
          userRentals.map((rental, index) => (
            <div
              key={rental.id || index}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
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
                <p className="text-xs text-gray-500 mt-1">
                  📅 {rental.startDate ? `${rental.startDate} (${rental.days} Hari)` : rental.date}
                </p>
                {rental.eventName && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    🎟️ Event: {rental.eventName}
                  </p>
                )}
              </div>

              <Badge status={rental.status || "Pending"} />
            </div>
          ))
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/20">
            <p className="text-sm font-semibold text-white">
              Belum ada riwayat peminjaman.
            </p>
            <p className="text-xs text-blue-100 mt-1">
              Silakan ajukan peminjaman lightstick terlebih dahulu di halaman Peminjaman.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}