import React from "react";
import { motion } from "framer-motion";
import {
  //   FaCertificate,
  FaMedal,
  FaHeart,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

// import { HiBadgeCheck } from "react-icons/hi";
const BRAND_ICONS = [
  {
    id: 1,
    icon: <FaMedal className="text-4xl maroon-color" />,
    title: "Certified Authenticity",
    // desc: "Every jewellery piece carries BIS Hallmark assurance for purity.",
  },
  {
    id: 2,
    icon: <FaMoneyBillWave className="text-4xl maroon-color" />,
    title: "Transparent Pricing",
    // desc: "No hidden charges — pay only for real gold and craftsmanship.",
  },

  {
    id: 3,
    icon: <FaClock className="text-4xl maroon-color" />,
    title: "Timeless Craftsmanship",
    // desc: "Handcrafted designs that stay elegant across generations.",
  },
  {
    id: 4,
    icon: <FaHeart className="text-4xl maroon-color" />,
    title: "Customer Love Guarantee",
    // desc: "We stand by our products — your satisfaction is our promise.",
  },
];

export default function Band() {
  return (
    <section
      className="new-font w-full py-16 bg-gradient-to-b from-[#fff9f9] to-[#fff]"
      aria-label="Our Brand Promises"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="p-4 rounded-full bg-maroon/10 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-base font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[12rem]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
