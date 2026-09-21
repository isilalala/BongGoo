// src/components/Card.js
"use client";

import { useRouter } from "next/navigation";
import Badge from "../components/Badge";

export default function Card({ item, groupName }) {
  const router = useRouter();

  const handleAjukanPinjam = () => {
    // Cek apakah user sudah login di localStorage
    const userRole = localStorage.getItem("userRole");

    if (userRole) {
      // Jika SUDAH login -> arahkan langsung ke halaman Peminjaman
      router.push("/peminjaman");
    } else {
      // Jika BELUM login -> arahkan ke halaman Login
      router.push("/login");
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between text-center">
      <div>
        {/* Header Card: Status & Grup */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase">
            {groupName}
          </span>
          <Badge status={item.status} />
        </div>

        {/* Container Foto Lightstick */}
        <div className="h-40 bg-slate-100 rounded-xl mb-3 flex items-center justify-center p-2">
          <img
            src={item.image || "/images/placeholder.png"}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Informasi Lightstick */}
        <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
        <p className="text-xs text-pink-600 font-semibold my-2">
          {item.price} / hari
        </p>
      </div>

      {/* Tombol Ajukan Pinjam */}
      <button
        type="button"
        onClick={handleAjukanPinjam}
        className="block w-full bg-pink-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-pink-700 transition cursor-pointer"
      >
        Ajukan Pinjam
      </button>
    </div>
  );
}