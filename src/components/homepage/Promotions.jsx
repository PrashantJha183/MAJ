import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import hero7 from "../../assets/MAJ Desktop 7.jpg";
import mobile7 from "../../assets/MAJ Mobile Banner 7.jpg";

export default function Promotion() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 640;
  const imageSrc = isMobile ? mobile7 : hero7;

  const [loaded, setLoaded] = useState(false);

  // Preload image for smoother display
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setLoaded(true);
  }, [imageSrc]);

  return (
    <>
      {/* Prefetch next route for faster navigation */}
      <link rel="prefetch" href="/contact" as="document" />
      <link rel="preload" href={imageSrc} as="image" />

      <div className="w-full p-4 md:p-10 mt-0 md:mt-20">
        {/* SKELETON LOADER */}
        {!loaded && (
          <div className="w-full h-[300px] md:h-[500px] bg-gray-300 animate-pulse rounded-lg"></div>
        )}

        {/* IMAGE with blur placeholder */}
        <img
          src={imageSrc}
          alt="Promotional Banner"
          onClick={() => navigate("/contact")}
          className={`
            w-full h-auto rounded-lg cursor-pointer object-cover
            transition-all duration-500
            ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}
          `}
        />
      </div>
    </>
  );
}
