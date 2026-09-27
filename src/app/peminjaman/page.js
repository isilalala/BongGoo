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
  const [selectedLightstick, setSelectedLightstick] = useState(null);
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. FETCH DAFTAR LIGHTSTICK
  useEffect(() => {
    const fetchLightsticks = async () => {
      try {
        setIsLoading(true);
        const res = await apiFetch("/lightsticks");

        const items = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.result)
          ? res.result
          : [];

        setLightsticksList(items);

        if (items.length > 0) {
          setSelectedLightstick(items[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data lightstick:", error);
        setErrorMsg("Gagal memuat daftar lightstick dari server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLightsticks();
  }, []);

  // 2. HANDLER SUBMIT PENGAJUAN PINJAM
  const handleBorrow = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const userString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const currentUser = userString ? JSON.parse(userString) : {};

    // Ambil UUID user resmi dari database
    const currentUserId =
      currentUser.Id ||
      currentUser.id ||
      currentUser.User_id ||
      currentUser.UUID ||
      currentUser.uuid;

    const currentUsername =
      currentUser.username ||
      currentUser.user_nama ||
      currentUser.Nama_lengkap ||
      currentUser.name ||
      "User";

    if (!token) {
      setErrorMsg("Sesi login Anda telah berakhir. Silakan login kembali.");
      return;
    }

    if (!currentUserId) {
      setErrorMsg("ID Pengguna tidak ditemukan. Silakan login kembali.");
      return;
    }

    if (!selectedLightstick) {
      setErrorMsg("Pilih unit lightstick terlebih dahulu.");
      return;
    }

    if (!startDate) {
      setErrorMsg("Pilih tanggal pinjam terlebih dahulu.");
      return;
    }

    // Format tanggal ISO YYYY-MM-DD
    const startObj = new Date(startDate);
    const endObj = new Date(startObj);
    endObj.setDate(startObj.getDate() + Number(days));

    const formattedStartDate = startObj.toISOString().split("T")[0];
    const formattedEndDate = endObj.toISOString().split("T")[0];

    // Hitung Total Price
    const pricePerDay = Number(
      selectedLightstick.Harga_sewa || selectedLightstick.harga_sewa || 0
    );
    const totalPrice = pricePerDay * Number(days);

    const lsId =
      selectedLightstick.Id || selectedLightstick.id || selectedLightstick.ID;
    const lsName =
      selectedLightstick.Nama_unit ||
      selectedLightstick.nama_unit ||
      selectedLightstick.name ||
      "Lightstick";

    try {
      setIsSubmitting(true);

      // PAYLOAD SESUAI STRUKTUR DATABASE
      const payload = {
        User_id: currentUserId,
        user_nama: currentUsername,
        Lightstick_id: lsId,
        lightstick_nama: lsName,
        Status: "pending",
        Rental_start_date: formattedStartDate,
        Rental_end_date: formattedEndDate,
        Total_price: totalPrice,
      };

      console.log("📤 Mengirim Payload Peminjaman ke API:", payload);

      const res = await apiFetch("/loans", {
        method: "POST",
        token: token,
        body: payload,
      });

      console.log("📥 Response dari POST /loans:", res);

      // Jika response mengandung flag error dari backend
      if (res && res.error) {
        throw new Error(res.message || "API menolak pengajuan peminjaman.");
      }

      alert("Berhasil! Pengajuan peminjaman Anda telah dikirim ke admin.");
      router.push("/status");
    } catch (error) {
      console.error("❌ Gagal Mengirim Pengajuan Peminjaman:", error);
      setErrorMsg(
        error.message ||
          "Gagal mengajukan peminjaman. Pastikan koneksi dan token valid."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 bg-cover bg-center flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-gray-200 shadow-2xl">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">
          Form Pengajuan Peminjaman
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Isi detail di bawah untuk mengajukan sewa lightstick.
        </p>

        {errorMsg && (
          <div className="p-3 mb-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-pink-600 font-bold text-xs animate-pulse">
            Memuat data...
          </div>
        ) : (
          <form onSubmit={handleBorrow} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Pilih Lightstick
              </label>
              <select
                onChange={(e) => {
                  const found = lightsticksList.find(
                    (item) => String(item.Id || item.id) === e.target.value
                  );
                  setSelectedLightstick(found);
                }}
                className="w-full border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 bg-slate-50/50"
              >
                {lightsticksList.map((item, idx) => {
                  const itemId = item.Id ?? item.id ?? item.ID ?? idx;
                  const itemName =
                    item.Nama_unit ?? item.nama_unit ?? item.name ?? "Lightstick";
                  const price = item.Harga_sewa ?? item.harga_sewa ?? 0;

                  return (
                    <option key={itemId} value={itemId}>
                      {itemName} - Rp {Number(price).toLocaleString("id-ID")}/hari
                    </option>
                  );
                })}
              </select>
            </div>

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
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs font-medium text-gray-900 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Durasi Sewa (Hari)
                </label>
                <Counter initialValue={1} onChange={(val) => setDays(val)} />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              className="py-3.5"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Pengajuan Peminjaman"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}