// components/Counter.js
"use client";

import { useState } from "react";

export default function Counter({ initialValue = 1, onChange }) {
  const [count, setCount] = useState(initialValue);

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      if (onChange) onChange(newCount);
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onChange) onChange(newCount);
  };

  return (
    <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl w-fit border border-gray-200">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition"
      >
        -
      </button>
      <span className="font-bold text-sm min-w-5 text-center">{count}</span>
      <button
        type="button"
        onClick={handleIncrement}
        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition"
      >
        +
      </button>
    </div>
  );
}