// components/pages/Jewellery/Naths.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Nath1 from "../../../assets/DSC_9085.JPG"; // fallback image
import nathsData from "./Naths.json"; // your Naths JSON file

const BlurOverlayImage = React.memo(
  ({ src, alt, isFailed, onLoad, onError }) => {
    const [loaded, setLoaded] = useState(false);
    const [showLqip, setShowLqip] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShowLqip(true), 100);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="relative w-full h-full overflow-hidden rounded-md bg-gray-100">
        {/* shimmer placeholder */}
        {!loaded && (
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]" />
        )}

        {/* blurred low-quality preview */}
        {showLqip && !loaded && !isFailed && (
          <img
            src={src}
            alt={`${alt} - LQIP`}
            className="absolute w-full h-full object-cover filter blur-2xl scale-110 opacity-70 transition-all duration-500"
          />
        )}

        {/* main image */}
        <img
          src={isFailed ? Nath1 : src}
          alt={alt}
          loading="lazy"
          onLoad={() => {
            setLoaded(true);
            onLoad?.();
          }}
          onError={() => {
            setLoaded(true);
            onError?.();
          }}
          className={`relative w-full h-full object-cover transition-all duration-700 ${
            loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105"
          } rounded-md`}
        />

        {/* blue frosted overlay */}
        {!loaded && (
          <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-2xl rounded-md z-10" />
        )}

        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }
);

export default function Naths() {
  const [loadedImages, setLoadedImages] = useState({});
  const [animateOnce, setAnimateOnce] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const [activeIndexes, setActiveIndexes] = useState({});
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [goldPricePerGram, setGoldPricePerGram] = useState(null);
  const intervalsRef = useRef({});
  const navigate = useNavigate();

  // Fetch gold price per gram
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gold/latest-per-gram`)
      .then((res) => res.json())
      .then((data) => setGoldPricePerGram(data.pricePerGram))
      .catch((err) =>
        console.error("Failed to fetch gold price per gram", err)
      );
  }, []);

  // Device/orientation check
  useEffect(() => {
    const checkOrientationAndDevice = () => {
      const isPortraitNow = window.matchMedia(
        "(orientation: portrait)"
      ).matches;
      setIsPortrait(isPortraitNow);
      const width = window.innerWidth;
      setIsMobileOrTablet(width < 1024);
    };

    checkOrientationAndDevice();
    window.addEventListener("resize", checkOrientationAndDevice);
    window.addEventListener("orientationchange", checkOrientationAndDevice);

    return () => {
      window.removeEventListener("resize", checkOrientationAndDevice);
      window.removeEventListener(
        "orientationchange",
        checkOrientationAndDevice
      );
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    setAnimateOnce(true);
  }, []);

  const handleImageLoad = (index, src) => {
    setLoadedImages((prev) => ({ ...prev, [`${index}_${src}`]: true }));
  };

  const handleImageError = (index, src) => {
    setFailedImages((prev) => ({ ...prev, [`${index}_${src}`]: true }));
  };

  const startSlideshow = (i, images) => {
    if (isMobileOrTablet) return;
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
    if (isMobileOrTablet) return;
    clearInterval(intervalsRef.current[i]);
    setActiveIndexes((prev) => ({ ...prev, [i]: 0 }));
  };

  const handleCardClick = (nath) => {
    navigate("/naths/details", { state: { nath } });
  };

  return (
    <div className="px-6 pt-12 pb-8 md:pt-32 md:pb-20 new-font">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 maroon-color">
        Naths
      </h2>

      <div
        className={`grid gap-6 justify-center ${
          isPortrait
            ? "grid-cols-2 sm:grid-cols-2"
            : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
        } max-w-7xl mx-auto`}
      >
        {nathsData.map((nath, i) => {
          const images = nath.images?.length ? nath.images : [Nath1];
          const activeIndex = activeIndexes[i] ?? 0;
          const src = images[activeIndex];
          const key = `${i}_${src}`;
          const isFailed = failedImages[key];

          const calculatedPrice =
            goldPricePerGram && nath.netWeight
              ? Math.round(nath.netWeight * goldPricePerGram * 1.18 * 1.03)
              : null;

          return (
            <motion.div
              key={nath.id}
              className={`bg-white rounded-md overflow-hidden shadow-md transition-all duration-500 cursor-pointer relative group ${
                !isMobileOrTablet ? "hover:shadow-xl" : ""
              }`}
              initial={!animateOnce ? { opacity: 0, y: 30 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onMouseEnter={() => startSlideshow(i, images)}
              onMouseLeave={() => stopSlideshow(i)}
              onClick={() => handleCardClick(nath)}
            >
              <motion.div
                className={`relative w-full ${
                  isPortrait ? "h-60" : "h-screen md:h-72 lg:h-80"
                } overflow-hidden`}
                whileHover={!isMobileOrTablet ? {} : {}}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <BlurOverlayImage
                    src={src}
                    alt={nath.name || "Jewellery Item"}
                    isFailed={isFailed}
                    onLoad={() => handleImageLoad(i, src)}
                    onError={() => handleImageError(i, src)}
                  />
                </AnimatePresence>
              </motion.div>

              <div className="p-3 text-center">
                <p className="text-sm font-medium text-gray-700">{nath.name}</p>
                <p className="text-lg font-semibold text-yellow-600 mt-1">
                  {calculatedPrice !== null ? (
                    `₹${calculatedPrice.toLocaleString()}`
                  ) : (
                    <span className="inline-block w-16 h-6 bg-gray-300 rounded animate-pulse" />
                  )}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
