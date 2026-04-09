import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}) {
  const base =
    "border inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "border-transparent bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500",

    secondary:
      "border-transparent bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400 focus:ring-slate-400",

    outline:
      "border-slate-300 text-slate-800 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300",

    ghost:
      "border-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300",

    danger:
      "border-transparent bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const width = fullWidth ? "w-full" : "";

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${base}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${width}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
      )}

      {children}
    </button>
  );
}
