import React, { useEffect, useState, memo } from "react";

// Image preloader with safe cleanup
const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.loading = "lazy";
    img.decoding = "async";
    img.onload = () => {
      resolve();
      img.onload = null;
    };
  });

const ImageWithPlaceholder = memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    preloadImage(src).then(() => {
      if (active) setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [src]);

  return (
    <div className="relative w-full h-80 sm:h-72 md:h-64 overflow-hidden rounded-t-lg bg-gray-200">
      {/* Always-visible placeholder */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out bg-gradient-to-br from-gray-300 to-gray-200 blur-2xl  ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Real image fades in after load */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{ willChange: "opacity, transform" }}
      />
    </div>
  );
});

export default ImageWithPlaceholder;
