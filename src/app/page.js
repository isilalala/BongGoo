// app/page.js
"use client";

import { useState } from "react";
import Link from "next/link"; 
import Hero from "../components/Hero";
import Card from "../components/Card";
import Button from "../components/Button";
import { groups, lightsticks } from "../data/dataLightstick";

export default function HomePage() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const activeGroup = groups.find((g) => g.id === selectedGroupId);
  const filteredLightsticks = selectedGroupId
    ? lightsticks.filter((item) => item.groupId === selectedGroupId)
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6 w-full">
      {/* 1. Landing Page publik */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <Hero />

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm max-w-2xl w-full mt-2 flex flex-col items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Siap Memulai Konser Favoritmu?
            </h2>
            <p className="text-sm text-gray-500">
              Silakan masuk atau daftar akun terlebih dahulu untuk melihat daftar lengkap grup K-Pop dan menyewa lightstick favoritmu.
            </p>
          </div>

          {/* Navigasi ke halaman /login */}
          <Link
            href="/login"
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5 transition-all duration-200 inline-block text-center cursor-pointer"
          >
            Masuk / Login Sekarang 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}