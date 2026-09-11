// app/approval/page.js
import Badge from "@/components/Badge";

export default function ApprovalPage() {
  // Simulasi role login
  const role = "admin"; // Ganti ke "user" untuk tes proteksi

  // Proteksi Sederhana untuk Sesi 2
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
      item: "Army Bomb Ver 4",
      date: "15/10/26 - 17/10/26",
      status: "Pending",
    },
    {
      id: "REQ-102",
      user: "NCTzen_99",
      item: "Neobong Ver 2",
      date: "18/10/26 - 19/10/26",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Panel Approval (Admin)</h1>
      <p className="text-sm text-gray-500 mb-6">Kelola dan beri persetujuan untuk peminjaman masuk.</p>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b text-gray-600 uppercase text-[11px] font-bold">
            <tr>
              <th className="p-4">Peminjam</th>
              <th className="p-4">Barang</th>
              <th className="p-4">Tanggal Pinjam</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pendingRequests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-semibold text-gray-800">{req.user}</td>
                <td className="p-4">{req.item}</td>
                <td className="p-4 text-gray-500 text-xs">{req.date}</td>
                <td className="p-4">
                  <Badge status={req.status} />
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <button className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition">
                    Approve
                  </button>
                  <button className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-700 transition">
                    Reject
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