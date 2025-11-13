import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import hero1 from "../../assets/compressed/MAJ_Desktop.jpg";
import hero2 from "../../assets/compressed/MAJ Desktop 2.jpg";
import hero4 from "../../assets/compressed/MAJ Desktop 4.jpg";

import mobile1 from "../../assets/compressed/MAJ_Mobile_Banner.jpg";
import mobile2 from "../../assets/compressed/MAJ Mobile Banner 2.jpg";
import mobile4 from "../../assets/compressed/MAJ Mobile Banner 4.jpg";

const slidesDesktop = [hero4, hero1, hero2];
const slidesMobile = [mobile1, mobile2, mobile4];

// Add link arrays (one link per slide). Edit paths as needed.
const slidesDesktopLinks = ["/products", "/rings", "/products"];
const slidesMobileLinks = ["/products", "/rings", "/products"];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const totalSlides = slidesDesktop.length;
  const navigate = useNavigate();

  // Detect orientation
  useEffect(() => {
    const checkOrientation = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  // Preload all images
  useEffect(() => {
    const preload = (srcs) =>
      srcs.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });

    const desktopImgs = preload(slidesDesktop);
    const mobileImgs = preload(slidesMobile);

    Promise.all(
      [...desktopImgs, ...mobileImgs].map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    ).then(() => setLoaded(true));
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  // Skeleton loader
  const SkeletonSlide = ({ height = "500px", dots }) => (
    <div className="relative w-full" style={{ height }}>
      <div className="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {dots.map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-gray-300" />
        ))}
      </div>
    </div>
  );

  if (!loaded) {
    return (
      <div className="p-4 md:p-10 mt-0 md:mt-20 w-full">
        <div className="hidden sm:block">
          <SkeletonSlide height="500px" dots={slidesDesktop} />
        </div>
        <div className="block sm:hidden">
          <SkeletonSlide height="300px" dots={slidesMobile} />
        </div>
      </div>
    );
  }

  const isMobileView = window.innerWidth < 640;
  const isTabletView = window.innerWidth >= 640 && window.innerWidth < 1024;
  const showDesktop =
    !isMobileView && (window.innerWidth >= 1024 || isLandscape);

  // Set dynamic height based on device type
  const getSlideHeight = () => {
    if (isMobileView) return "300px";
    if (isTabletView) return "600px";
    return "70vh";
  };

  return (
    <div className="w-full relative p-4 md:p-10 mt-0 md:mt-20" {...handlers}>
      {/* Desktop + Tablet Landscape */}
      {showDesktop ? (
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ height: getSlideHeight() }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={slidesDesktop[current]}
              src={slidesDesktop[current]}
              alt={`Hero Banner Desktop ${current + 1}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onClick={() => navigate(slidesDesktopLinks[current])}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-4 bg-transparent text-white rounded-full p-2 shadow-lg transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={50} />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-4 bg-transparent text-white rounded-full p-2 shadow-lg transition"
            aria-label="Next Slide"
          >
            <ChevronRight size={50} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
            {slidesDesktop.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? "bg-yellow-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Mobile + Tablet Portrait
        <div
          className="relative w-full overflow-hidden rounded-lg hero-image-height"
          style={{ height: getSlideHeight() }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={slidesMobile[current]}
              src={slidesMobile[current]}
              alt={`Hero Banner Mobile ${current + 1}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={() => navigate(slidesMobileLinks[current])}
            />
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {slidesMobile.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? "bg-yellow-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Shimmer effect */}
      <style>{`
        .animate-shimmer {
          background: linear-gradient(90deg, rgba(229,229,229,1) 0%, rgba(200,200,200,0.6) 50%, rgba(229,229,229,1) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
