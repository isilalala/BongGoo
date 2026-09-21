// 1. Data Grup K-Pop (Parent Data)
// data/dataLightstick.js

export const groups = [
  {
    id: "A",
    name: "BTS",
    logo: "/group/BTS.jpg", // Logo grup BTS
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    id: "B",
    name: "NCT",
    logo: "/group/NCT.jpg", // Logo grup NCT
    badgeColor: "bg-lime-100 text-lime-700 border-lime-200",
  },
  {
    id: "C",
    name: "SEVENTEEN",
    logo: "/group/SEVENTEEN.jpg", // Logo grup SEVENTEEN
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    id: "D",
    name: "BLACKPINK",
    logo: "/group/BLACKPINK.jpg", // Logo grup BLACKPINK
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "E",
    name: "TWICE",
    logo: "/group/TWICE.jpg", // Logo grup TWICE
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "F",
    name: "BABYMON",
    logo: "/group/BABYMON.jpg", // Logo grup BABYMON
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "G",
    name: "BIGBANG",
    logo: "/group/BIGBANG.jpg", // Logo grup BIGBANG
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "H",
    name: "CORTIS",
    logo: "/group/CORTIS.jpg", // Logo grup CORTIS
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "I",
    name: "ENHYPEN",
    logo: "/group/ENHYPEN.jpg", // Logo grup ENHYPEN
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "J",
    name: "EXO",
    logo: "/group/EXO.jpg", // Logo grup EXO
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "K",
    name: "H2H",
    logo: "/group/H2H.jpg", // Logo grup H2H
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "L",
    name: "IKON",
    logo: "/group/IKON.jpg", // Logo grup IKON
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "M",
    name: "IVE",
    logo: "/group/IVE.jpg", // Logo grup IVE
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "N",
    name: "LNGSHOT",
    logo: "/group/LNGSHOT.jpg", // Logo grup LNGSHOT
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "O",
    name: "NEWJEANS",
    logo: "/group/NEWJEANS.jpg", // Logo grup NEWJEANS
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "P",
    name: "REDVELVET",
    logo: "/group/REDVELVET.jpg", // Logo grup REDVELVET
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "Q",
    name: "SHINEE",
    logo: "/group/SHINEE.jpg", // Logo grup SHINEE
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "R",
    name: "SNSD",
    logo: "/group/SNSD.jpg", // Logo grup SNSD
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "S",
    name: "TREASURE",
    logo: "/group/TREASURE.jpg", // Logo grup TREASURE
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "T",
    name: "TXT",
    logo: "/group/TXT.jpg", // Logo grup TXT
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