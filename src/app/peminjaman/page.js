// app/peminjaman/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Counter from "../../components/Counter";
import Button from "../../components/Button";
import { apiFetch } from "../../lib/api";

export default function PeminjamanPage() {
  const router = useRouter();

  const [lightsticksList, setLightsticksList] = useState([]);
  const [selectedLightstickId, setSelectedLightstickId] = useState("");
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. FETCH DATA LIGHTSTICK DARI API BACKEND
  useEffect(() => {
    const fetchLightsticks = async () => {
      try {
        setIsLoading(true);
        const res = await apiFetch("/lightsticks");

        // Helper ekstraksi array data dari API
        const items = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.result)
          ? res.result
          : [];

        setLightsticksList(items);

        // Atur item pertama sebagai pilihan default jika ada data
        if (items.length > 0) {
          const firstId = items[0].Id ?? items[0].id ?? items[0].ID;
          if (firstId !== undefined) {
            setSelectedLightstickId(String(firstId));
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data lightstick dari API:", error);
        setErrorMsg("Gagal memuat daftar lightstick dari server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLightsticks();
  }, []);

  // Detail item terpilih dari state
  const selectedItem =
    lightsticksList.find((item) => {
      const itemId = item.Id ?? item.id ?? item.ID;
      return String(itemId) === String(selectedLightstickId);
    }) || lightsticksList[0];

  // Ekstrak harga dari properti API
  const rawPrice =
    selectedItem?.Harga_sewa ??
    selectedItem?.harga_sewa ??
    selectedItem?.price ??
    0;

  const itemPriceNum =
    typeof rawPrice === "number"
      ? rawPrice
      : parseInt(String(rawPrice).replace(/[^0-9]/g, ""), 10) || 0;

  const totalBiaya = itemPriceNum * days;

  // 2. HANDLER SUBMIT KE API BACKEND
  const handleBorrow = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const userString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const currentUser = userString ? JSON.parse(userString) : {};

    // Ambil ID / User_id dari localStorage
    const rawUserId = currentUser.Id || currentUser.id || currentUser.User_id || currentUser.user_id;

    if (!rawUserId) {
      setErrorMsg("ID Pengguna tidak ditemukan. Silakan login ulang.");
      return;
    }

    if (!selectedLightstickId) {
      setErrorMsg("Pilih lightstick terlebih dahulu.");
      return;
    }

    if (!startDate) {
      setErrorMsg("Pilih tanggal pinjam terlebih dahulu.");
      return;
    }

    // Hitung tanggal selesai pinjam (Rental_end_date) otomatis berdasarkan durasi hari
    const start = new Date(startDate);
    const endDateObj = new Date(start);
    endDateObj.setDate(start.getDate() + Number(days));
    const rentalEndDate = endDateObj.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    try {
      // Body payload lengkap sesuai kebutuhan API /loans
      const payload = {
        User_id: isNaN(Number(rawUserId)) ? rawUserId : Number(rawUserId),
        Lightstick_id: isNaN(Number(selectedLightstickId)) ? selectedLightstickId : Number(selectedLightstickId),
        Tanggal_pinjam: startDate,
        Rental_start_date: startDate,
        Rental_end_date: rentalEndDate, // 👈 Menjawab error: 'Field "Rental_end_date" wajib diisi'
        Durasi: Number(days),
        Nama_event: eventName,
        Status: "PENDING",
        status: "PENDING",
      };

      await apiFetch("/loans", {
        method: "POST",
        token: token,
        body: payload,
      });

      alert("Pengajuan peminjaman berhasil terkirim!");
      router.push("/status");
    } catch (error) {
      console.error("Gagal mengirim pengajuan:", error);
      setErrorMsg(error.message || "Gagal mengajukan peminjaman ke server.");
    }
  };

  return (
    <div className="w-full min-h-screen h-screen py-10 px-4 bg-cover bg-center bg-no-repeat flex items-center justify-center font-sans">
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

        {errorMsg && (
          <div className="p-3 mb-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium">
            {errorMsg}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-pink-600 font-bold text-xs animate-pulse">
            Memuat data lightstick dari API...
          </div>
        ) : (
          <form onSubmit={handleBorrow} className="space-y-5">
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
                {lightsticksList.length === 0 ? (
                  <option value="">Tidak ada lightstick yang tersedia</option>
                ) : (
                  lightsticksList.map((item, idx) => {
                    const itemId = item.Id ?? item.id ?? item.ID ?? idx;
                    const itemName =
                      item.Nama_unit ?? item.nama_unit ?? item.name ?? item.lightstick_name ?? "Lightstick";
                    const groupName =
                      item.grup_nama ?? item.Nama_grup ?? item.group_name ?? "";
                    const priceVal =
                      item.Harga_sewa ?? item.harga_sewa ?? item.price ?? 0;

                    const price =
                      typeof priceVal === "number"
                        ? priceVal
                        : parseInt(String(priceVal).replace(/[^0-9]/g, ""), 10) || 0;

                    return (
                      <option key={itemId} value={itemId}>
                        {groupName ? `[${groupName}] ` : ""}{itemName} - Rp {price.toLocaleString("id-ID")}/hari
                      </option>
                    );
                  })
                )}
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
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
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
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
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
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="py-3.5"
            >
              Kirim Pengajuan Peminjaman
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}