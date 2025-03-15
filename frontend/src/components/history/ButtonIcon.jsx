import React from "react";

function ButtonIcon({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-5 h-5 object-contain ${className}`}
    />
  );
}

export default ButtonIcon;
