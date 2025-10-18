import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../../assets/MAJ_Desktop.jpg";
import hero2 from "../../assets/MAJ Desktop 2.jpg";
import mobile1 from "../../assets/MAJ_Mobile_Banner.jpg";
import mobile2 from "../../assets/MAJ Mobile Banner 2.jpg";

const slidesDesktop = [hero1, hero2];
const slidesMobile = [mobile1, mobile2];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const totalSlides = slidesDesktop.length;

  // Preload images
  useEffect(() => {
    const desktopImgs = slidesDesktop.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    const mobileImgs = slidesMobile.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

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
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
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

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 1 }),
  };

  const transition = { type: "tween", duration: 0.6, ease: "easeInOut" };

  // Skeleton loader component
  const SkeletonSlide = ({ width = "100%", height = "500px", dots }) => (
    <div className="relative w-full" style={{ height }}>
      <div className="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>
      {/* Dots as placeholders */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {dots.map((_, index) => (
          <div key={index} className="w-3 h-3 rounded-full bg-gray-300" />
        ))}
      </div>
    </div>
  );

  if (!loaded) {
    return (
      <div className="p-4 md:p-10 mt-0 md:mt-20 w-full">
        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <SkeletonSlide height="500px" dots={slidesDesktop} />
        </div>
        {/* Mobile skeleton */}
        <div className="block md:hidden">
          <SkeletonSlide height="300px" dots={slidesMobile} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative p-4 md:p-10 mt-0 md:mt-20" {...handlers}>
      {/* Desktop / Tablet */}
      <div className="hidden md:block w-full relative overflow-hidden rounded-lg h-screen">
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

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-4 bg-yellow-600 text-white rounded-full p-2 shadow-lg hover:bg-yellow-700 transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-4 bg-yellow-600 text-white rounded-full p-2 shadow-lg hover:bg-yellow-700 transition"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
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

      {/* Mobile */}
      <div className="block md:hidden w-full relative overflow-hidden rounded-lg h-[300px]">
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

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
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
