// app/peminjaman/page.js
"use client";

import { useState } from "react";
import Counter from "@/components/Counter";
import Button from "@/components/Button";
import { lightsticks } from "@/data/dataLightstick";

export default function PeminjamanPage() {
  const [selectedLightstickId, setSelectedLightstickId] = useState("A1");
  const [days, setDays] = useState(1);

  // Ambil detail item terpilih
  const selectedItem =
    lightsticks.find((item) => item.id === selectedLightstickId) || lightsticks[0];

  // Ekstrak harga angka dari string misal "Rp 45.000" -> 45000
  const itemPriceNum = selectedItem
    ? parseInt(selectedItem.price.replace(/[^0-9]/g, ""), 10) || 0
    : 0;

  const totalBiaya = itemPriceNum * days;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pengajuan peminjaman berhasil dikirim! Silakan cek di halaman Status.");
  };

  return (
    <div className="w-full min-h-screen h-screen py-10 px-4 bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/fandom-kpop.jpg')" }}
        />
      <div className="max-w-2xl w-full mx-auto my-6 bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-gray-200 shadow-2xl">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">
          Form Pengajuan Peminjaman
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Isi detail di bawah untuk mengajukan sewa lightstick.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Pilih Barang */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Pilih Lightstick
            </label>
            <select
              value={selectedLightstickId}
              onChange={(e) => setSelectedLightstickId(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {lightsticks.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.id}] {item.name} - {item.price}/hari
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal Pinjam & Durasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Tanggal Pinjam
              </label>
              <input
                type="date"
                required
                className="w-full border border-gray-300 rounded-xl p-2.5 text-xs font-medium text-gray-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Durasi Sewa (Hari)
              </label>
              <Counter initialValue={1} onChange={(val) => setDays(val)} />
            </div>
          </div>

          {/* Keperluan / Event */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Nama Konser / Event
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Konser BTS World Tour Jakarta"
              className="w-full border border-gray-300 rounded-xl p-2.5 text-xs font-medium text-gray-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Ringkasan Biaya */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-600 uppercase">
              Estimasi Total Biaya:
            </span>
            <span className="text-lg font-bold text-pink-600">
              Rp {totalBiaya.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Tombol Submit */}
          <Button type="submit" variant="primary" size="lg" fullWidth className="py-3.5">
            Kirim Pengajuan Peminjaman
          </Button>
        </form>
      </div>
    </div>
  );
}