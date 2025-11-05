import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import ringsData from "./Rings.json";
import Ring1 from "../../../assets/DSC_9085.JPG"; // fallback image

export default function Rings() {
  const [loadedImages, setLoadedImages] = useState({});
  const [animateOnce, setAnimateOnce] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    setAnimateOnce(true);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    console.warn(`Image failed to load for product index ${index}`);
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  const renderImages = useMemo(() => {
    return ringsData.map((ring, i) => {
      const isLoaded = loadedImages[i];
      const isFailed = failedImages[i];
      const showHoverImage = hovered === i && ring.images[1];

      const baseImage = isFailed ? Ring1 : ring.images?.[0] || Ring1;
      const hoverImage = isFailed ? Ring1 : ring.images?.[1] || baseImage;

      return (
        <motion.div
          key={ring.id}
          className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          initial={!animateOnce ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Image Container */}
          <div className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden">
            {/* Skeleton Loader */}
            {!isLoaded && !isFailed && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            )}

            {/* Base Image */}
            <img
              src={baseImage}
              alt={ring.name || "Jewellery Item"}
              loading="lazy"
              onLoad={() => handleImageLoad(i)}
              onError={() => handleImageError(i)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isLoaded || isFailed ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Hover Image (fade in smoothly) */}
            {ring.images?.[1] && (
              <img
                src={hoverImage}
                alt={`${ring.name} alternate`}
                loading="lazy"
                onError={() => handleImageError(i)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  showHoverImage ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 text-center">
            <p className="text-sm font-medium text-gray-700">{ring.name}</p>
            <p className="text-lg font-semibold text-yellow-600 mt-1">
              ₹{ring.price.toLocaleString()}
            </p>
          </div>
        </motion.div>
      );
    });
  }, [ringsData, loadedImages, failedImages, hovered, animateOnce]);

  return (
    <div className="px-6 pt-12 pb-8 md:pt-32 md:pb-20 bg-gray-50 new-font">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
        Our Rings Collection
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
        {renderImages}
      </div>
    </div>
  );
}
