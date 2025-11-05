// components/pages/Jewellery/Rings.jsx
import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Ring1 from "../../../assets/DSC_9085.JPG"; // fallback image

export default function Rings() {
  const [ringsData, setRingsData] = useState([]);
  const [animateOnce, setAnimateOnce] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState({});
  const [failedImages, setFailedImages] = useState({});
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
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

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

  // Lazy-loaded Image component
  const LazyImage = ({ src, alt, index }) => {
    const Img = lazy(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                default: () => (
                  <img
                    src={src}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover rounded-md transition-all duration-700 ease-in-out opacity-100"
                  />
                ),
              }),
            0
          )
        )
    );

    return (
      <Suspense
        fallback={
          <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse rounded-md" />
        }
      >
        <Img />
      </Suspense>
    );
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
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-md overflow-hidden shadow-md animate-pulse h-64 md:h-72 lg:h-80"
              />
            ))
          : ringsData.map((ring, i) => {
              const images = ring.images?.length ? ring.images : [Ring1];
              const activeIndex = activeIndexes[i] ?? 0;
              const src = images[activeIndex];
              const isFailed = failedImages[`${i}_${src}`];

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
                  <div className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden rounded-md">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={src}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{
                          duration: 0.9,
                          ease: [0.83, 0, 0.17, 1],
                        }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {!isFailed ? (
                          <LazyImage src={src} alt={ring.name} index={i} />
                        ) : (
                          <img
                            src={Ring1}
                            alt="fallback"
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

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
