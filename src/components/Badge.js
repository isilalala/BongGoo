// components/Badge.js
export default function Badge({ status }) {
  // Pemetaan warna berdasarkan status
  const statusStyles = {
    Tersedia: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Dipinjam: "bg-rose-100 text-rose-700 border-rose-200",
    Rejected: "bg-rose-100 text-rose-700 border-rose-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
        statusStyles[status] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}