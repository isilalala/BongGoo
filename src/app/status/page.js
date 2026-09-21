// app/status/page.js
import Badge from "../../components/Badge";

export default function StatusPage() {
  // Data dummy riwayat pengajuan peminjaman user
  const userRentals = [
    {
      id: "REQ-001",
      item: "Army Bomb Ver 4",
      group: "BTS",
      date: "15 Okt 2026 - 17 Okt 2026",
      status: "Pending",
    },
    {
      id: "REQ-002",
      item: "Caratbong Ver 3",
      group: "SEVENTEEN",
      date: "01 Jul 2026 - 02 Jul 2026",
      status: "Approved",
    },
  ];

  return (
    <div className="w-full min-h-screen fixed inset-0 -z-10 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 text-white pt-12 md:pt-16 pb-12 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full pt-10 text-center">
        {/* Judul & Deskripsi */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-100 drop-shadow-md mb-2">
          Status Peminjaman Saya
        </h1>
        <p className="text-xs md:text-sm text-white mb-8">
          Pantau persetujuan dan riwayat peminjaman lightstick kamu.
        </p>
      </div>
      <div className="space-y-4">
        {userRentals.map((rental) => (
          <div
            key={rental.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                  {rental.group}
                </span>
                <span className="text-xs text-gray-500">ID: {rental.id}</span>
              </div>
              <h2 className="font-bold text-gray-800 text-lg">{rental.item}</h2>
              <p className="text-xs text-gray-500 mt-1">📅 {rental.date}</p>
            </div>

            <Badge status={rental.status} />
          </div>
        ))}
      </div>
    </div>
  );
}