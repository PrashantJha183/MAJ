import React, {
  useEffect,
  useState,
  useCallback,
  memo,
  lazy,
  Suspense,
} from "react";
import { motion } from "framer-motion";
import image from "/Jewellery/DSC_8896.JPG";
import anniversary from "/Jewellery/DSC_9066.JPG";
import wedding from "/Jewellery/DSC_9062.JPG";
import engagement from "/Jewellery/DSC_9086.JPG";

// --- Data ---
const IMAGES = [
  { id: "birthday", title: "Birthday", src: image, alt: "Birthday gift" },
  { id: "wedding", title: "Wedding", src: wedding, alt: "Wedding gift" },
  {
    id: "anniversary",
    title: "Anniversary",
    src: anniversary,
    alt: "Anniversary gift",
  },
  {
    id: "engagement",
    title: "Engagement",
    src: engagement,
    alt: "Engagement gift",
  },
];

// --- Preload helper ---
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
const Card = memo(({ item, showTextAlways, playOnce }) => {
  const [loaded, setLoaded] = useState(false);
  const handleImgLoad = useCallback(() => setLoaded(true), []);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-md shadow-md bg-white-40 backdrop-blur-sm"
      // Animation setup
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={playOnce ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileInView={!playOnce ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 14,
        mass: 0.8,
        duration: 0.8,
      }}
      viewport={{ once: playOnce, amount: 0.3 }} // Only play once if requested
      whileHover={!showTextAlways ? { scale: 1.02 } : {}}
    >
      {/* Skeleton shimmer loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300/40 animate-pulse overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_1.8s_linear_infinite]" />
        </div>
      )}

      {/* Soft blur placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 blur-3xl scale-110 transition-all duration-700 ease-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Main Image */}
      <motion.img
        src={item.src}
        alt={item.alt}
        onLoad={handleImgLoad}
        loading="lazy"
        width={900}
        height={600}
        draggable={false}
        className={`w-full h-56 md:h-68 lg:h-72 object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
          loaded
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-[1.08] blur-sm"
        }`}
        style={{ willChange: "opacity, transform" }}
      />

      {/* Text overlay */}
      <motion.div
        transition={{ type: "spring", stiffness: 100, damping: 14 }}
        className={`absolute bottom-0 md:bottom-2 left-0 w-full px-4 py-3 text-center text-white backdrop-blur-md transition-all duration-400 transform ${
          showTextAlways
            ? "opacity-100 translate-y-0 low-bg-laptop"
            : "opacity-0 translate-y-5 low-bg group-hover:opacity-100 group-hover:translate-y-0"
        }`}
      >
        <h3 className="text-lg font-semibold tracking-wide drop-shadow-md">
          {item.title}
        </h3>
      </motion.div>

      {/* Shine keyframes */}
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

// Lazy-load Card
const LazyCard = lazy(() => Promise.resolve({ default: Card }));

// --- Main Gift Section ---
export default function Gift() {
  const isTouch = useIsTouchDevice();
  const [loadedMap, setLoadedMap] = useState({});
  const [hasAnimated, setHasAnimated] = useState(false); // Track animation status

  useEffect(() => {
    (async () => {
      const results = await Promise.all(IMAGES.map((i) => preloadImage(i.src)));
      const map = {};
      results.forEach((r) => (map[r.src] = true));
      setLoadedMap(map);
    })();
  }, []);

  // Mark animation as played once (runs only on first render)
  useEffect(() => {
    if (!hasAnimated) setHasAnimated(true);
  }, [hasAnimated]);

  const isLoaded = useCallback((src) => !!loadedMap[src], [loadedMap]);

  return (
    <section className="new-font mx-auto px-4 py-12">
      {/* Header animation (only once) */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
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

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center max-w-6xl mx-auto">
        <Suspense
          fallback={
            <div className="col-span-4 text-center text-gray-500 py-10 animate-pulse">
              Loading gifts...
            </div>
          }
        >
          {IMAGES.map((img) => (
            <LazyCard
              key={img.id}
              item={img}
              showTextAlways={isTouch}
              playOnce={hasAnimated} // Pass down "play once" control
            />
          ))}
        </Suspense>
      </div>
    </section>
  );
}
