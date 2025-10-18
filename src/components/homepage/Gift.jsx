import React, { useEffect, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import image from "../../assets/DSC_8896.JPG";

// Gift.jsx — Minimalistic & Optimized Gift Section with Responsive Animation + LQIP Blur-Up + Skeleton Loader

const IMAGES = [
  { id: "birthday", title: "Birthday", src: image, alt: "Birthday gift" },
  { id: "wedding", title: "Wedding", src: image, alt: "Wedding gift" },
  {
    id: "anniversary",
    title: "Anniversary",
    src: image,
    alt: "Anniversary gift",
  },
  { id: "engagement", title: "Engagement", src: image, alt: "Engagement gift" },
];

// --- Utility to preload images ---
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.complete) return resolve({ src, status: "cached" });
    img.onload = () => resolve({ src, status: "loaded" });
    img.onerror = () => resolve({ src, status: "error" });
  });
}

// --- Detect touch devices ---
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

// --- Card Component ---
const Card = memo(({ item, showTextAlways }) => {
  const [loaded, setLoaded] = useState(false);
  const handleImgLoad = useCallback(() => setLoaded(true), []);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-md shadow-md bg-white-40 backdrop-blur-sm"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={!showTextAlways ? { scale: 1.03 } : {}}
    >
      {/* LQIP placeholder (same image, highly blurred) */}
      {!loaded && (
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-80"
          draggable={false}
        />
      )}

      {/* Skeleton shimmer loader overlay for image & text */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300/40 animate-pulse overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_1.5s_linear_infinite]" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-md bg-gray-200/60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_1.5s_linear_infinite]" />
          </div>
        </div>
      )}

      {/* Main Image (high resolution) */}
      <img
        src={item.src}
        alt={item.alt}
        onLoad={handleImgLoad}
        loading="lazy"
        width={1200}
        height={800}
        draggable={false}
        className={`w-full h-60 md:h-72 lg:h-80 object-cover transition-all duration-700 ease-out transform-gpu ${
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0"
        }`}
      />

      {/* Bottom overlay */}
      <motion.div
        transition={{ duration: 0.3 }}
        className={`absolute bottom-0 md:bottom-2 left-0 w-full px-4 py-3 text-center text-white backdrop-blur-md transition-all duration-300 transform ${
          showTextAlways
            ? "opacity-100 translate-y-0 low-bg-laptop"
            : "opacity-0 translate-y-5 low-bg group-hover:opacity-100 group-hover:translate-y-0"
        }`}
      >
        {loaded ? (
          <h3 className="text-lg font-semibold tracking-wide drop-shadow-md">
            {item.title}
          </h3>
        ) : (
          // Text skeleton shimmer placeholder
          <div className="mx-auto w-24 h-5 rounded-md bg-gray-200/60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_1.5s_linear_infinite]" />
          </div>
        )}
      </motion.div>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.div>
  );
});

// --- Main Gift Section ---
export default function Gift() {
  const isTouch = useIsTouchDevice();
  const [loadedMap, setLoadedMap] = useState({});

  useEffect(() => {
    (async () => {
      const results = await Promise.all(IMAGES.map((i) => preloadImage(i.src)));
      const map = {};
      results.forEach((r) => (map[r.src] = true));
      setLoadedMap(map);
    })();
  }, []);

  const isLoaded = useCallback((src) => !!loadedMap[src], [loadedMap]);

  return (
    <section className="new-font mx-auto px-4 py-12">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-md font-medium maroon-color uppercase tracking-wide">
          Curated Collections
        </p>
        <h2 className="mt-2 font-extrabold">
          Discover timeless jewellery crafted to celebrate every precious
          occasion — elegant, meaningful, and uniquely yours.
        </h2>
        <p className="mt-2 maroon-color maroon-gradient py-4 max-w-8xl mx-auto text-xl md:text-4xl font-extrabold">
          PERFECT GIFT SHOW
        </p>
      </motion.header>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center max-w-6xl mx-auto">
        {IMAGES.map((img) => (
          <Card key={img.id} item={img} showTextAlways={isTouch} />
        ))}
      </div>
    </section>
  );
}
