// app/layout.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-gray-800 min-h-screen flex flex-col justify-between">
        {/* Navbar Atas */}
        <Navbar />

        {/* Area Konten Utama */}
        <main className="w-full flex-1 flex flex-col">{children}</main>

        {/* Footer Bawah */}
        <Footer />
      </body>
    </html>
  );
}