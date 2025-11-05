// components/pages/Jewellery/Rings.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Ring1 from "../../../assets/DSC_9085.JPG"; // fallback image

import ringsData from "./Rings.json";

export default function Rings() {
  const [loadedImages, setLoadedImages] = useState({});
  const [animateOnce, setAnimateOnce] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const [activeIndexes, setActiveIndexes] = useState({});
  const intervalsRef = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateOnce(true);
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  const handleImageLoad = (index, src) => {
    setLoadedImages((prev) => ({ ...prev, [`${index}_${src}`]: true }));
  };

  const handleImageError = (index, src) => {
    setFailedImages((prev) => ({ ...prev, [`${index}_${src}`]: true }));
  };

  const startSlideshow = (i, images) => {
    clearInterval(intervalsRef.current[i]);
    if (!images || images.length < 2) return;
    intervalsRef.current[i] = setInterval(() => {
      setActiveIndexes((prev) => ({
        ...prev,
        [i]: ((prev[i] ?? 0) + 1) % images.length,
      }));
    }, 1200);
  };

  const stopSlideshow = (i) => {
    clearInterval(intervalsRef.current[i]);
    setActiveIndexes((prev) => ({ ...prev, [i]: 0 }));
  };

  const handleCardClick = (ring) => {
    navigate("/rings/details", { state: { ring } });
  };

  return (
    <div className="px-6 pt-12 pb-8 md:pt-32 md:pb-20 bg-gray-50 new-font">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 maroon-color">
        Rings
      </h2>

      <div
        className="
          grid gap-6 justify-center
          grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
          [@media(orientation:portrait)]:grid-cols-2 
          [@media(orientation:landscape)]:grid-cols-3
          max-w-7xl mx-auto
        "
      >
        {ringsData.map((ring, i) => {
          const images = ring.images?.length ? ring.images : [Ring1];
          const activeIndex = activeIndexes[i] ?? 0;
          const src = images[activeIndex];
          const key = `${i}_${src}`;
          const isLoaded = loadedImages[key];
          const isFailed = failedImages[key];

          return (
            <motion.div
              key={ring.id}
              className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={!animateOnce ? { opacity: 0, y: 30 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onMouseEnter={() => startSlideshow(i, images)}
              onMouseLeave={() => stopSlideshow(i)}
              onClick={() => handleCardClick(ring)}
            >
              <div className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden rounded-md">
                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={src}
                    src={isFailed ? Ring1 : src}
                    alt={ring.name || "Jewellery Item"}
                    loading="lazy"
                    onLoad={() => handleImageLoad(i, src)}
                    onError={() => handleImageError(i, src)}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.83, 0, 0.17, 1],
                    }}
                    className="absolute inset-0 w-full h-full object-cover rounded-md transition-all duration-700 ease-in-out"
                  />
                </AnimatePresence>

                {/* Liquid glass / frosted overlay */}
                {!isLoaded && (
                  <div className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-xl animate-pulse rounded-md" />
                )}
              </div>

              <div className="p-3 text-center">
                <p className="text-sm font-medium text-gray-700">{ring.name}</p>
                <p className="text-lg font-semibold text-yellow-600 mt-1">
                  ₹{ring.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
