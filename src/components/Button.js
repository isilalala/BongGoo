// components/Button.js
export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // options: primary, secondary, danger, success, outline
  size = "md", // options: sm, md, lg
  fullWidth = false,
  className = "",
  disabled = false,
}) {
  // Style Dasar
  const baseStyles =
    "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variasi Warna (Tema BongGoo Pink/Purple)
  const variants = {
    primary: "bg-pink-600 text-white hover:bg-pink-700 shadow-sm active:scale-95",
    secondary: "bg-slate-100 text-gray-700 hover:bg-slate-200 active:scale-95",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:scale-95",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-95",
    outline: "border border-pink-600 text-pink-600 hover:bg-pink-50 active:scale-95",
  };

  // Ukuran Button
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-xs",
    lg: "px-5 py-3 text-sm",
  };

  const widthStyle = fullWidth ? "w-full" : "w-fit";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
    >
      {children}
    </button>
  );
}