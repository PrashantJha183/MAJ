// components/pages/Jewellery/Rings.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Ring1 from "../../../assets/DSC_9085.JPG"; // fallback image

export default function Rings() {
  const [ringsData, setRingsData] = useState([]); // <-- fixed: declare ringsData
  const [loadedImages, setLoadedImages] = useState({});
  const [animateOnce, setAnimateOnce] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const [activeIndexes, setActiveIndexes] = useState({});
  const intervalsRef = useRef({});
  const navigate = useNavigate();

  // Load Rings.json dynamically
  useEffect(() => {
    setAnimateOnce(true);

    const loadRingsData = async () => {
      try {
        const module = await import(`${import.meta.env.VITE_RINGS_JSON}`);
        if (module && module.default) {
          setRingsData(module.default);
        } else {
          console.warn("Rings.json is empty or invalid.");
          setRingsData([]);
        }
      } catch (err) {
        console.error("Failed to load Rings.json:", err);
        setRingsData([]);
      }
    };

    loadRingsData();

    return () => {
      // Clear all intervals on unmount
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
    <div className="px-6 pt-12 pb-8 md:pt-32 md:pb-20 new-font h-full">
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
      min-h-[30rem] md:min-h-[36rem] lg:min-h-[40rem] 
    "
      >
        {ringsData.length === 0
          ? // Skeleton placeholders to preserve layout
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-md overflow-hidden shadow-md animate-pulse h-64 md:h-72 lg:h-80"
              />
            ))
          : ringsData.map((ring, i) => {
              const images = ring.images?.length ? ring.images : [Ring1];
              const activeIndex = activeIndexes[i] ?? 0;
              const src = images[activeIndex];
              const key = `${i}_${src}`;
              const isLoaded = loadedImages[key];
              const isFailed = failedImages[key];

              return (
                <motion.div
                  key={ring.id || i}
                  className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  initial={!animateOnce ? { opacity: 0, y: 30 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  onMouseEnter={() => startSlideshow(i, images)}
                  onMouseLeave={() => stopSlideshow(i)}
                  onClick={() => handleCardClick(ring)}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden rounded-md">
                    {!isLoaded && !isFailed && (
                      <img
                        src={src}
                        alt={`${ring.name} placeholder`}
                        className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-30"
                        aria-hidden="true"
                      />
                    )}

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
                        className={`absolute inset-0 w-full h-full object-cover rounded-md transition-all duration-700 ease-in-out ${
                          isLoaded
                            ? "blur-0 scale-100 opacity-100"
                            : "blur-2xl scale-105 opacity-0"
                        }`}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      {ring.name}
                    </p>
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
