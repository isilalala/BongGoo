// components/Hero.js
export default function Hero() {
  return (
    <div className="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 text-white rounded-3xl p-8 md:p-12 mb-8 text-center shadow-md">
      <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-widest inline-block mb-3 backdrop-blur-sm">
        Official Lightstick Rental
      </span>
      <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
        WELCOME TO BONGGOO!
      </h1>
      <p className="text-sm md:text-base opacity-90 max-w-xl mx-auto">
        Sewa lightstick konser K-Pop favoritmu dengan cepat, aman, dan harga terjangkau.
      </p>
    </div>
  );
}