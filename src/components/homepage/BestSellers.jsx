import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BadgeCheck, Shield } from "lucide-react";

import ring from "../../assets/Jewellery/DSC_9105.JPG";
import necklace from "../../assets/Jewellery/DSC_9041.JPG";
import earrings from "../../assets/Jewellery/DSC_8974.JPG";
import mangalsutra from "../../assets/Jewellery/DSC_9010.JPG";

// Sample best-seller data
const bestSellers = [
  { id: 1, name: "Ring", img: ring },
  { id: 2, name: "Necklace Set", img: necklace },
  { id: 3, name: "Earrings Set", img: earrings },
  { id: 4, name: "Mangalsutra", img: mangalsutra },
];

// Preload image function
const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
  });

// Image placeholder component (LQIP effect)
const ImageWithPlaceholder = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    preloadImage(src).then(() => {
      if (isMounted) setLoaded(true);
    });
    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div className="relative w-full h-80 sm:h-72 md:h-64 overflow-hidden rounded-lg bg-gray-200">
      {/* LQIP placeholder (blurred) */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover blur-2xl transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const BestSellers = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="px-4 py-12 max-w-7xl mx-auto new-font">
      <h2 className="text-3xl font-bold mb-8 text-center maroon-color">
        Best Sellers
      </h2>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {bestSellers.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <ImageWithPlaceholder src={product.img} alt={product.name} />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>

              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">
                  Making charges: 18% + 3% GST.
                </p>

                {/* Right side certification badges */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full"
                    title="BIS Hallmarked 916 Gold"
                  >
                    <BadgeCheck size={14} className="text-green-600" />
                    916
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    title="HUID Certified Jewellery"
                  >
                    <Shield size={14} className="text-blue-600" />
                    HUID
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BestSellers;
