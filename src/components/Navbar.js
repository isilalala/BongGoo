import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-none bg-black">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 py-4">
        <Link href="/" className="text-lg font-bold">Sewa Lighstick</Link>
        <div className="flex gap-10 text-sm">
          <Link href="/" className="text-lg font-bold text-white ">Beranda</Link>
          <Link href="" className="text-lg font-bold text-white">Tentang</Link>
        </div>
      </div>
    </nav>
  );
}