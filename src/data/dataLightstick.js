// 1. Data Grup K-Pop (Parent Data)
// data/dataLightstick.js

export const groups = [
  {
    id: "A",
    name: "BTS",
    logo: "/BTS.jpg", // Logo grup BTS
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    id: "B",
    name: "NCT",
    logo: "/NCT.jpg", // Logo grup NCT
    badgeColor: "bg-lime-100 text-lime-700 border-lime-200",
  },
  {
    id: "C",
    name: "SEVENTEEN",
    logo: "/SEVENTEEN.jpg", // Logo grup SEVENTEEN
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    id: "D",
    name: "BLACKPINK",
    logo: "/BLACKPINK.jpg", // Logo grup BLACKPINK
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
];

// 2. Data Lightstick (Child Data - terhubung via groupId)
// data/dataLightstick.js

export const lightsticks = [
  {
    id: "A1",
    groupId: "A",
    name: "Army Bomb Ver 3",
    version: "Version 3",
    price: "Rp 45.000",
    status: "Tersedia",
    image: "/images/bts-v3.jpg"  // <-- Path ke gambar di folder public/images/
  },
  {
    id: "A2",
    groupId: "A",
    name: "Army Bomb Ver 4",
    version: "Version 4",
    price: "Rp 50.000",
    status: "Dipinjam",
    image: "/images/bts-v4.jpg"  // <-- Path gambar
  },
  {
    id: "B1",
    groupId: "B",
    name: "Neobong Ver 1",
    version: "Version 1",
    price: "Rp 40.000",
    status: "Tersedia",
    image: "/images/nct-v1.jpg"  // <-- Path gambar
  }
];