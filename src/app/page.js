// app/page.js
"use client";

<<<<<<< HEAD
import { useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Button from "../components/Button";
import { groups, lightsticks } from "../data/dataLightstick";

export default function HomePage() {
  // State untuk menyimpan ID grup yang dipilih (null artinya belum ada grup yang diklik)
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // Ambil detail data grup yang sedang dipilih (jika ada)
  const activeGroup = groups.find((g) => g.id === selectedGroupId);

  // Filter lightstick berdasarkan grup yang sedang dipilih
=======
import { useState, useRef } from "react";
import Card from "../components/Card";
import { groups, lightsticks } from "../data/dataLightstick";

export default function HomePage() {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || null);
  
  // Ref untuk menandai bagian katalog lightstick di bawah
  const lightstickSectionRef = useRef(null);

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);

    // Otomatis scroll ke bagian koleksi lightstick secara halus
    setTimeout(() => {
      lightstickSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const activeGroup = groups.find((g) => g.id === selectedGroupId);
>>>>>>> 32c971009add9eaffdd216c51b667fbac220c523
  const filteredLightsticks = selectedGroupId
    ? lightsticks.filter((item) => item.groupId === selectedGroupId)
    : [];

  return (
<<<<<<< HEAD
    <div className="max-w-6xl mx-auto p-6 w-full">
      {/* 1. Hero Banner */}
      <Hero />

      {/* ------------------- TAMPILAN 1: PILIH GRUP ------------------- */}
      {!selectedGroupId ? (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-wider text-gray-400">
              Pilih Grup K-Pop
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Klik logo atau nama grup untuk melihat koleksi lightstick resmi yang tersedia
            </p>
          </div>

          {/* Grid Logo / Kartu Grup */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {groups.map((group) => {
              // Hitung jumlah lightstick yang dimiliki grup ini
              const totalItems = lightsticks.filter(
                (item) => item.groupId === group.id
              ).length;

              return (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-pink-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-between group"
                >
                  {/* Container Logo: p-1 atau p-0 agar tidak ada jarak tersisa di dalam kotak */}
                  <div className="w-28 h-28 bg-slate-50 rounded-2xl p-1 flex items-center justify-center mb-4 group-hover:bg-pink-50 transition overflow-hidden">
                  {/* Gambar Logo: w-full h-full & object-cover / object-contain */}
                    <img
                      src={group.logo || "/fandom-kpop.jpg"}
                      alt={group.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-120 transition duration-300"
                    />
                  </div>

                  {/* Informasi Grup */}
                  <div>
                    <h3 className="font-extrabold text-gray-800 text-lg group-hover:text-pink-600 transition">
                      {group.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-gray-400 bg-slate-100 px-3 py-1 rounded-full inline-block mt-2">
                      {totalItems} Lightstick
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ------------------- TAMPILAN 2: KATALOG LIGHTSTICK GRUP TERPILIH ------------------- */
        <div>
          {/* Header & Navigasi Kembali */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl p-2 flex items-center justify-center border border-pink-100">
                <img
                  src={activeGroup?.logo || "/fandom-kpop.jpg"}
                  alt={activeGroup?.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-400">
                  Koleksi Lightstick {activeGroup?.name}
                </h2>
                <p className="text-xs text-gray-450">
                  Menampilkan {filteredLightsticks.length} varian lightstick
                </p>
              </div>
            </div>

            {/* Tombol Kembali ke Daftar Semua Grup */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedGroupId(null)}
              className="w-fit"
            >
              ⬅️ Pilih Grup Lain
            </Button>
          </div>

          {/* Grid Card Lightstick Terkait */}
          {filteredLightsticks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredLightsticks.map((item) => (
                <Card key={item.id} item={item} groupName={activeGroup?.name} />
              ))}
            </div>
          ) : (
            /* Jika grup belum punya item lightstick */
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
              <p className="text-gray-400 text-sm">
                Belum ada koleksi lightstick untuk grup ini.
              </p>
            </div>
          )}
        </div>
      )}
=======
    <div className="max-w-6xl mx-auto p-6 w-full flex flex-col gap-8">
      {/* Banner Utama / Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 p-8 md:p-12 rounded-3xl text-white text-center shadow-lg flex flex-col items-center justify-center gap-3">
        <span className="bg-white/20 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-white/20">
          Official Lightstick Rental
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          WELCOME TO BONGGOO!
        </h1>
        <p className="text-pink-100 text-sm md:text-base max-w-xl">
          Sewa lightstick konser K-Pop favoritmu dengan cepat, aman, dan harga terjangkau.
        </p>
      </div>

      {/* Bagian Pilih Grup K-Pop */}
      <div className="flex flex-col items-center gap-2 text-center my-2">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-wide uppercase">
          PILIH GRUP K-POP
        </h2>
        <p className="text-xs text-gray-400">
          Klik logo atau nama grup untuk melihat koleksi lightstick resmi yang tersedia
        </p>
      </div>

      {/* Grid Logo Grup */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {groups.map((group) => {
          const isSelected = selectedGroupId === group.id;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => handleSelectGroup(group.id)}
              className={`p-4 rounded-3xl border transition-all duration-200 flex flex-col items-center justify-center gap-3 cursor-pointer ${
                isSelected
                  ? "bg-pink-600 border-pink-500 shadow-lg shadow-pink-600/30 scale-105"
                  : "bg-white border-gray-200 hover:border-pink-300 hover:shadow-md"
              }`}
            >
              {/* Container Logo Grup */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center p-1">
                <img
                  src={group.logo}
                  alt={group.name}
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-gray-800"}`}>
                {group.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Target Scroll & Daftar Lightstick */}
      <div ref={lightstickSectionRef} className="scroll-mt-6">
        {selectedGroupId && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                Koleksi Lightstick {activeGroup?.name}
              </h3>
            </div>

            {filteredLightsticks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredLightsticks.map((ls) => (
                  <Card key={ls.id} item={ls} groupName={activeGroup?.name} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center">
                <p className="text-sm text-gray-400">
                  Belum ada unit lightstick yang tersedia untuk grup {activeGroup?.name}.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
>>>>>>> 32c971009add9eaffdd216c51b667fbac220c523
    </div>
  );
}