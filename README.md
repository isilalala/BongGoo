## 📖 Overview
**BongGoo** adalah platform persewaan *lightstick* konser modern berbasis web yang dirancang khusus untuk memenuhi kebutuhan para penggemar K-Pop. BongGoo hadir sebagai solusi hemat dan praktis bagi para penonton konser yang ingin tetap menikmati atmosfer *lightstick ocean* tanpa harus membeli unit baru dengan harga mahal. Nama **BongGoo** berasal dari gabungan kata **"Bong (봉)"** (*lightstick*) dan **"Goo"** (*go*/jalan/sewa). Rent Your Lightstick, Light Up Your Concert Experience!

## 🚀 Fitur Utama (Features)

### 1. 🔐 Authentication (Sistem Akun)
- **Register & Login:** Akses masuk menggunakan Email & Password.
- **Role Akun:** 
  - 👤 **User:** Peminjam *lightstick*.
  - 👥 **Admin:** Pengelola data dan persetujuan peminjaman.

### 2. 💖 Katalog & Pengajuan Peminjaman
- **Katalog Lightstick:** Memilih *lightstick* berdasarkan grup K-Pop yang ingin dipilih beserta foto, nama unit, dan rincian harga.
- **Transparansi Harga:** Harga yang tertera sudah *all-in* (termasuk biaya sewa dan deposit/jaminan).
- **Form Peminjaman:** 
  - Pengisian data diri peminjam termasuk kartu identitas untuk verifikasi jaminan.

### 3. 📋 Daftar Status Peminjaman (User Dashboard)
- **Riwayat & Status Sewa:** User dapat memantau status pengajuan mereka secara langsung:
  - ⏳ `Menunggu Persetujuan` (Pending/Menunggu Persetujuan Admin)
  - ✅ `Disetujui` (Approved/Disetujui & Siap Diambil)
  - 🚚 `Sedang Dipinjam` (Active/Sedang Dipinjam)
  - 🎉 `Selesai` (Returned/Sudah Dikembalikan)
  - ❌ `Ditolak` (Rejected/Dibatalkan)

### 4. ⚙️ Approval Management (Admin Panel)
- **Dashboard Admin:** Menampilkan semua daftar pengajuan peminjaman dari user.
- **Verifikasi & Aksi:** Admin dapat mengecek data & kartu identitas peminjam, lalu memilih aksi **Approve** (Setujui) atau **Reject** (Tolak).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
