// components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-5 mt-12 text-center text-xs text-gray-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-semibold text-gray-700">
          BongGoo 💖 &copy; 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}