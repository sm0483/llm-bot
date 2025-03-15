import React from "react";

function Avatar({ src, alt = "main-logo-svg" }) {
  return (
    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center mr-3">
      <img src={src} alt={alt} />
    </div>
  );
}

export default Avatar;
