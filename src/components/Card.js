// src/components/Card.js
"use client";

import { useRouter } from "next/navigation";
import Badge from "../components/Badge";

export default function Card({ item = {}, groupName }) {
  const router = useRouter();

  const handleAjukanPinjam = () => {
    // Cek token autentikasi di localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Jika SUDAH login -> arahkan ke halaman Peminjaman
      router.push("/peminjaman");
    } else {
      // Jika BELUM login -> arahkan ke halaman Login
      router.push("/login");
    }
  };

  // Fallback Gambar & Harga dari API Backend
  const imageUrl = item.image || item.image_url || item.logo || "/images/placeholder.png";
  
  // Format harga (Apakah tipe number atau string)
  const formattedPrice =
    typeof item.price === "number"
      ? `Rp ${item.price.toLocaleString("id-ID")}`
      : item.price || "Rp 0";

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between text-center">
      <div>
        {/* Header Card: Status & Grup */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase">
            {groupName || item.group_name || item.group || "K-POP"}
          </span>
          <Badge status={item.status || "Tersedia"} />
        </div>

        {/* Container Foto Lightstick */}
        <div className="h-40 bg-slate-100 rounded-xl mb-3 flex items-center justify-center p-2">
          <img
            src={imageUrl}
            alt={item.name || "Lightstick"}
            className="h-full w-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.png";
            }}
          />
        </div>

        {/* Informasi Lightstick */}
        <h3 className="font-bold text-gray-800 text-sm">{item.name || "Nama Lightstick"}</h3>
        <p className="text-xs text-pink-600 font-semibold my-2">
          {formattedPrice} / hari
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