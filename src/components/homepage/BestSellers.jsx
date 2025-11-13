import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BadgeCheck, Shield } from "lucide-react";

// Lazy-load heavy image component (code-splitting)
const ImageWithPlaceholder = lazy(() => import("../base/ImageWithPlaceholder"));

// Local assets
import ring from "/Jewellery/compressed/DSC_9105.JPG";
import necklace from "/Jewellery/compressed/DSC_9041.JPG";
import earrings from "/Jewellery/compressed/DSC_8974.JPG";
import mangalsutra from "/Jewellery/compressed/DSC_9010.JPG";

const bestSellers = [
  { id: 1, name: "Ring", img: ring },
  { id: 2, name: "Necklace Set", img: necklace },
  { id: 3, name: "Earrings Set", img: earrings },
  { id: 4, name: "Mangalsutra", img: mangalsutra },
];

// Simple skeleton shimmer loader
const Skeleton = ({
  height = "h-6",
  width = "w-full",
  rounded = "rounded-md",
}) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${height} ${width} ${rounded}`}
  />
);

const BestSellers = () => {
  // Trigger animation only once (not every scroll)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const [isLoading, setIsLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ tracks if animation already played

  useEffect(() => {
    // Simulate small loading phase for text (real-world: API fetch)
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Mark animation as played once the section first comes into view
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  // Container + Item animations
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 10,
        mass: 0.6,
        bounce: 0.35,
      },
    },
  };

  return (
    <section ref={ref} className="px-4 py-12 max-w-7xl mx-auto new-font">
      <h2 className="text-3xl font-bold mb-8 text-center maroon-color">
        Best Sellers
      </h2>

      <motion.div
        className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        // Animate only once after first visibility
        animate={hasAnimated ? "show" : "hidden"}
      >
        {bestSellers.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white transition-shadow duration-300"
          >
            {/* Lazy-load image with Suspense fallback */}
            <Suspense
              fallback={
                <div className="relative w-full h-80 sm:h-72 md:h-64 overflow-hidden rounded-lg bg-gray-200 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
                  </div>
                </div>
              }
            >
              <ImageWithPlaceholder src={product.img} alt={product.name} />
            </Suspense>

            <div className="p-4 flex flex-col gap-2">
              {isLoading ? (
                <>
                  <Skeleton height="h-5" width="w-3/4" />
                  <Skeleton height="h-4" width="w-2/3" />
                  <div className="mt-2 space-y-2">
                    <Skeleton height="h-4" width="w-1/2" />
                    <Skeleton height="h-4" width="w-1/3" />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-lg text-center maroon-color">
                    {product.name}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    {/* Optional info section */}
                    {/* 
                    <div className="flex flex-col items-start gap-2">
                      <div
                        className="flex items-center gap-1 text-xs text-center font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        title="BIS Hallmarked 916 Gold"
                      >
                        <BadgeCheck size={30} className="text-green-600" />
                        916 Hallmark
                      </div>

                      <div
                        className="flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        title="HUID Certified Jewellery"
                      >
                        <Shield size={14} className="text-blue-600" />
                        HUID
                      </div>
                    </div> 
                    */}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default memo(BestSellers);
