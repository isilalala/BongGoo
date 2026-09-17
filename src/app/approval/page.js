// app/approval/page.js

export default function ApprovalPage() {
  // Simulasi role login
  const role = "admin"; // Ganti ke "user" untuk tes proteksi

  // Proteksi Sederhana
  if (role !== "admin") {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md mx-auto my-10 p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Akses Ditolak! 🚫</h1>
        <p className="text-gray-500 text-sm mb-6">
          Halaman ini khusus untuk Admin. Kamu tidak memiliki izin untuk mengakses halaman persetujuan.
        </p>
      </div>
    );
  }

  // Data dummy pengajuan masuk untuk Admin
  const pendingRequests = [
    {
      id: "REQ-101",
      user: "Zidny Ilma",
      item: "Army Bomb",
      date: "15/10/26 - 17/10/26",
    },
    {
      id: "REQ-102",
      user: "NCTzen_99",
      item: "Neobong V2",
      date: "18/10/26 - 19/10/26",
    },
    {
      id: "REQ-103",
      user: "Carat_Girl",
      item: "Caratbong",
      date: "22/10/26 - 23/10/26",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      {/* 1. JUDUL & DESKRIPSI */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Dashboard Approval Peminjaman
        </h1>
        <p className="text-sm text-gray-600">
          Kelola dan beri persetujuan untuk pengajuan peminjaman lightstick.
        </p>
      </div>

      {/* 2. STAT CARDS RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Total Masuk
          </p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>

        <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200 shadow-sm">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            Menunggu
          </p>
          <p className="text-2xl font-bold text-amber-600">3</p>
        </div>

        <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200 shadow-sm">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            Disetujui
          </p>
          <p className="text-2xl font-bold text-emerald-600">8</p>
        </div>
      </div>

      {/* 3. DAFTAR PENGAJUAN MASUK */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Daftar Pengajuan Masuk</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-[11px] font-extrabold tracking-wider">
            <tr>
              <th className="p-4">PEMINJAM</th>
              <th className="p-4">BARANG</th>
              <th className="p-4">TANGGAL PINJAM</th>
              <th className="p-4 text-center">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pendingRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50/80 transition">
                <td className="p-4 font-semibold text-gray-900">{req.user}</td>
                <td className="p-4 text-gray-700">{req.item}</td>
                <td className="p-4 text-gray-600 text-xs font-medium">{req.date}</td>
                <td className="p-4 flex gap-2 justify-center">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs">
                    Setujui
                  </button>
                  <button className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs">
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}