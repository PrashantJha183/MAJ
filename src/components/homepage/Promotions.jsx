import React from "react";
import { useNavigate } from "react-router-dom";

import hero7 from "../../assets/MAJ Desktop 7.jpg";
import mobile7 from "../../assets/MAJ Mobile Banner 7.jpg";

export default function Promotion() {
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 640;
  const imageSrc = isMobile ? mobile7 : hero7;

  return (
    <div className="w-full p-4 md:p-10 mt-0 md:mt-20">
      <img
        src={imageSrc}
        alt="Promotional Banner"
        className="w-full h-auto rounded-lg cursor-pointer object-cover"
        onClick={() => navigate("/contact")}
      />
    </div>
  );
}
