import React from 'react';


function IconButton({ src, alt }) {
  return (
    <div className="">
      <img
        src={src}
        alt={alt}
        className="w-5 h-5 object-contain"
      />
    </div>
  );
}

export default IconButton;