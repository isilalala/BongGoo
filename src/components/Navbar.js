import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">Sewa Lighstick</Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="text-lg font-bold">Beranda</Link>
          <Link href="/tentang" clssName="text-lg font-bold">Tentang</Link>
        </div>
      </div>
    </nav>
  );
}