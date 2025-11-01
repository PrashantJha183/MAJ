import React from "react";
import { motion } from "framer-motion";
import { FaMedal, FaHeart, FaClock, FaMoneyBillWave } from "react-icons/fa";

const BRAND_ICONS = [
  {
    id: 1,
    icon: <FaMedal className="text-4xl maroon-color" />,
    title: "Certified Authenticity",
  },
  {
    id: 2,
    icon: <FaMoneyBillWave className="text-4xl maroon-color" />,
    title: "Transparent Pricing",
  },
  {
    id: 3,
    icon: <FaClock className="text-4xl maroon-color" />,
    title: "Timeless Craftsmanship",
  },
  {
    id: 4,
    icon: <FaHeart className="text-4xl maroon-color" />,
    title: "Customer Love Guarantee",
  },
];

// Shared smooth spring config
const smoothSpring = {
  type: "spring",
  stiffness: 90,
  damping: 14,
  mass: 0.6,
  bounce: 0.35,
};

export default function Band() {
  return (
    <section
      className="new-font w-full py-16 bg-gradient-to-b from-[#fff9f9] to-[#fff]"
      aria-label="Our Brand Promises"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={smoothSpring}
        viewport={{ once: false, amount: 0.3 }}
        className="text-center text-2xl md:text-4xl font-extrabold maroon-color mb-12"
      >
        Our Promise to You
      </motion.h2>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 text-center">
        {BRAND_ICONS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ...smoothSpring,
              delay: i * 0.1, // staggered reveal
            }}
            viewport={{ once: false, amount: 0.25 }}
            whileHover={{
              transition: { type: "spring", stiffness: 180, damping: 12 },
            }}
            className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl shadow-sm  transition-all duration-300"
          >
            <motion.div
              className="p-4 rounded-full bg-maroon/10 flex items-center justify-center"
              // whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 140, damping: 10 }}
            >
              {item.icon}
            </motion.div>

            <h3 className="text-base font-semibold text-gray-800">
              {item.title}
            </h3>

            {item.desc && (
              <p className="text-xs text-gray-500 leading-relaxed max-w-[12rem]">
                {item.desc}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
