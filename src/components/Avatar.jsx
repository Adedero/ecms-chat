import React, { useState } from "react";

export default function Avatar({
  src,
  alt = "",
  size = "md",
  className = "",
  ...props
}) {
  const [imgError, setImgError] = useState(false);

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const showImage = src && !imgError;

  return (
    <div
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-slate-200
        text-slate-700
        font-medium
        overflow-hidden
        select-none
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        getInitials(alt)
      )}
    </div>
  );
}
