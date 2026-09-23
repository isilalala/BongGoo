// app/page.js
"use client";

import { useState, useRef } from "react";
import Card from "../components/Card";
import { groups, lightsticks } from "../data/dataLightstick";
import Hero from "../components/Hero";
import PanduanSewa from "../components/PanduanSewa";

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
  const filteredLightsticks = selectedGroupId
    ? lightsticks.filter((item) => item.groupId === selectedGroupId)
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6 w-full">
      {/* 1. Hero Banner */}
      <Hero />
      {/* ---------- TAMPILAN 1: PILIH GRUP ---------- */}
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

        {/* Grid Logo Grup */}
        {/* ... sisa kode grid kamu di sini ... */}
        </div>
    ) : (
  /* ... tampilan detail grup / komponen selanjutnya ... */
      null
    )}

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
            <div className="flex items-center gap-2 border-gray-800 pb-3">
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
      <PanduanSewa />
    </div>
  );
}