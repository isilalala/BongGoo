// src/app/page.js
"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import PanduanSewa from "../components/PanduanSewa";
import Hero from "../components/Hero";
import { apiFetch } from "../lib/api";

const BACKEND_URL = "https://hmif.if.unram.ac.id";

export default function HomePage() {
  const [groups, setGroups] = useState([]);
  const [lightsticks, setLightsticks] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const resGroups = await apiFetch("/groups");
        const resLightsticks = await apiFetch("/lightsticks");

        const extractArray = (res) => {
          if (!res) return [];
          if (Array.isArray(res)) return res;
          if (Array.isArray(res.data)) return res.data;
          if (Array.isArray(res.result)) return res.result;
          return [];
        };

        const apiGroups = extractArray(resGroups);
        const apiLightsticks = extractArray(resLightsticks);

        setGroups(apiGroups);
        setLightsticks(apiLightsticks);
      } catch (error) {
        console.error("Gagal memuat API Beranda:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter lightstick berdasarkan grup yang dipilih
  const filteredLightsticks = selectedGroup
    ? lightsticks.filter((item) => {
        const itemGroupId = item["Grup id"] ?? item.Grup_id ?? item.group_id ?? item.grup_id;
        const itemGroupName = item.grup_nama ?? item.Nama_grup ?? item.group_name ?? item.nama_grup;

        const selId = selectedGroup.Id ?? selectedGroup.id;
        const selName = selectedGroup.Nama ?? selectedGroup.nama ?? selectedGroup.name;

        return (
          (itemGroupId !== undefined && selId !== undefined && String(itemGroupId) === String(selId)) ||
          (itemGroupName && selName && String(itemGroupName).toLowerCase() === String(selName).toLowerCase())
        );
      })
    : lightsticks;

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans pb-16">
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase">
            Pilih Grup K-Pop
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Klik logo atau nama grup untuk melihat koleksi lightstick resmi yang tersedia
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-pink-500 font-bold text-xs animate-pulse">
            Memuat daftar grup & katalog K-Pop...
          </div>
        ) : (
          <>
            {/* Tombol Navigasi Grup */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
              <button
                onClick={() => setSelectedGroup(null)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  selectedGroup === null
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                ✨ Semua Grup
              </button>

              {groups.map((group, idx) => {
                const groupName = group.Nama || group.nama || group.name || "Grup";
                const groupId = group.Id || group.id || idx;
                const isSelected =
                  (selectedGroup?.Id || selectedGroup?.id) === groupId ||
                  (selectedGroup?.Nama || selectedGroup?.nama) === groupName;

                const logoPath = group.Gambar || group.gambar || group.logo || group.image || "";
                const logoUrl = logoPath.startsWith("http")
                  ? logoPath
                  : logoPath
                  ? `${BACKEND_URL}${logoPath.startsWith("/") ? "" : "/"}${logoPath}`
                  : "";

                return (
                  <button
                    key={groupId}
                    onClick={() => setSelectedGroup(group)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105"
                        : "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700/50"
                    }`}
                  >
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt={groupName}
                        className="w-4 h-4 object-contain rounded-full"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                    <span>{groupName}</span>
                  </button>
                );
              })}
            </div>

            {/* Katalog Lightstick */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center gap-2">
                📦{" "}
                {selectedGroup
                  ? `Koleksi ${
                      selectedGroup.Nama || selectedGroup.nama || selectedGroup.name
                    }`
                  : "Semua Koleksi Lightstick"}
              </h3>

              {filteredLightsticks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredLightsticks.map((item, idx) => {
                    const itemId = item.Id || item.id || idx;
                    const groupName =
                      item.grup_nama || item.Nama_grup || item.group_name || item.nama_grup || "K-POP";
                    const itemName =
                      item.Nama_unit || item.nama_unit || item.name || item.nama || "Lightstick";
                    const price = item.Harga_sewa || item.harga_sewa || item.price || 0;

                    const imagePath = item.Gambar || item.gambar || item.image || item.foto || "";
                    let imageUrl = "/images/placeholder.png";

                    if (imagePath) {
                      if (imagePath.startsWith("http")) {
                        imageUrl = imagePath;
                      } else {
                        imageUrl = `${BACKEND_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
                      }
                    }

                    const cardItem = {
                      id: itemId,
                      name: itemName,
                      price: price,
                      image: imageUrl,
                      status: item.Is_available || item.is_available || item.status === "TERSEDIA" ? "Tersedia" : "Disewa",
                    };

                    return (
                      <Card key={itemId} item={cardItem} groupName={groupName} />
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-800/50 rounded-2xl p-8 text-center border border-slate-700">
                  <p className="text-xs text-gray-400">
                    Belum ada lightstick yang tersedia untuk grup ini.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Komponen Panduan Sewa & Syarat Ketentuan */}
      <PanduanSewa />
    </main>
  );
}