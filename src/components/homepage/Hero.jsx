import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../../assets/MAJ_Desktop.jpg";
import hero2 from "../../assets/MAJ Desktop 2.jpg";
import hero3 from "../../assets/MAJ Desktop 3.jpg";
import hero4 from "../../assets/MAJ Desktop 4.jpg";

import mobile1 from "../../assets/MAJ_Mobile_Banner.jpg";
import mobile2 from "../../assets/MAJ Mobile Banner 2.jpg";
import mobile3 from "../../assets/MAJ Mobile Banner 3.jpg";
import mobile4 from "../../assets/MAJ Mobile Banner 4.jpg";

const slidesDesktop = [hero3, hero4, hero1, hero2];
const slidesMobile = [mobile1, mobile2, mobile3, mobile4];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const totalSlides = slidesDesktop.length;

  // Preload images
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
    setDirection(1);
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
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

  // Show placeholder fixed height before images load
  if (!loaded) {
    return (
      <div className="p-4 md:p-10 mt-0 md:mt-20 w-full">
        {/* Desktop + Tablet */}
        <div className="hidden sm:block">
          <SkeletonSlide height="500px" dots={slidesDesktop} />
        </div>
        {/* Mobile */}
        <div className="block sm:hidden">
          <SkeletonSlide height="300px" dots={slidesMobile} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative p-4 md:p-10 mt-0 md:mt-20" {...handlers}>
      {/* Desktop + Tablet */}
      <div
        className={`hidden sm:block w-full relative overflow-hidden rounded-lg ${
          window.innerWidth >= 640 && window.innerWidth <= 1024
            ? "hero-image-height"
            : ""
        }`}
        style={{
          height:
            window.innerWidth >= 640 && window.innerWidth <= 1024
              ? undefined
              : "70vh",
        }}
      >
        <div className="absolute inset-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={slidesDesktop[current]}
              src={slidesDesktop[current]}
              alt={`Hero Banner Desktop ${current + 1}`}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-4 bg-transparent text-white rounded-full p-2 shadow-lg  transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={50} />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-4 bg-transparent text-white rounded-full p-2 shadow-lg  transition"
          aria-label="Next Slide"
        >
          <ChevronRight size={50} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-6 z-10">
          {slidesDesktop.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current ? "bg-yellow-600 w-12" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div
        className="block sm:hidden w-full relative overflow-hidden rounded-lg"
        style={{ height: "300px" }}
      >
        <div className="absolute inset-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={slidesMobile[current]}
              src={slidesMobile[current]}
              alt={`Hero Banner Mobile ${current + 1}`}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-3 left-40 -translate-x-1/3 flex space-x-3 z-10">
          {slidesMobile.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? "bg-yellow-600 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Shimmer effect styles */}
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
