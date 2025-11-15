// components/pages/Jewellery/MangalsutraDetails.jsx
import React, { useState, useCallback, useEffect, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Hm916Icon from "../../../assets/hm916.jpeg";

const MangalsutraDetails = memo(() => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const mangalsutra = state?.mangalsutra;
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [goldPricePerGram, setGoldPricePerGram] = useState(null);
  const [activeTab, setActiveTab] = useState("description"); // description / pricing

  if (!mangalsutra) {
    navigate("/mangalsutras");
    return null;
  }

  // Fetch latest gold price per gram
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gold/latest-per-gram`)
      .then((res) => res.json())
      .then((data) => setGoldPricePerGram(data.pricePerGram))
      .catch((err) =>
        console.error("Failed to fetch gold price per gram", err)
      );
  }, []);

  // Preload images
  useEffect(() => {
    mangalsutra.images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setLoadedImages((prev) => ({
          ...prev,
          [src]: true,
        }));
    });
  }, [mangalsutra.images]);

  // Image navigation
  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % mangalsutra.images.length);
  }, [mangalsutra.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) =>
      prev === 0 ? mangalsutra.images.length - 1 : prev - 1
    );
  }, [mangalsutra.images.length]);

  // Pricing calculation
  const goldCost =
    goldPricePerGram && mangalsutra.netWeight
      ? mangalsutra.netWeight * goldPricePerGram
      : 0;
  const makingCharges = goldCost * 0.18; // 18%
  const subtotal = goldCost + makingCharges;
  const gst = subtotal * 0.03; // 3% GST
  const finalPrice = subtotal + gst;

  return (
    <div className="min-h-screen px-6 pt-12 pb-8 md:pt-32 md:pb-20 new-font">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Back Button */}
        <div className="p-4 border-b flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition"
          >
            <ArrowLeft size={20} /> Back to Mangalsutras
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Image Gallery */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md bg-gray-100 select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={mangalsutra.images[currentImage]}
                src={mangalsutra.images[currentImage]}
                alt={`${mangalsutra.name} - view ${currentImage + 1}`}
                draggable={false}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  loadedImages[mangalsutra.images[currentImage]]
                    ? "blur-0 scale-100 opacity-100"
                    : "blur-md scale-105 opacity-70"
                }`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
              />
            </AnimatePresence>

            {/* Desktop Arrows */}
            <div className="hidden md:flex absolute inset-y-0 w-full justify-between items-center px-3">
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Mobile Swipe */}
            <motion.div
              className="absolute inset-0 md:hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) nextImage();
                else if (offset.x > 50 || velocity.x > 500) prevImage();
              }}
            />

            {/* Dots */}
            <div className="absolute bottom-3 w-full flex justify-center items-center">
              <div className="flex gap-2">
                {mangalsutra.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? "bg-yellow-600 scale-110"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <motion.h1
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {mangalsutra.name}
            </motion.h1>

            {/* Net Weight */}
            <motion.p
              className="text-sm text-gray-500 mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Net Weight:{" "}
              {mangalsutra.netWeight ? `${mangalsutra.netWeight} grams` : "N/A"}
            </motion.p>

            {/* Toggle Buttons */}
            <div className="mt-6 flex gap-2 bg-gray-100 rounded-md overflow-hidden">
              <button
                onClick={() => setActiveTab("description")}
                className={`flex-1 py-2 text-center font-medium transition ${
                  activeTab === "description"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("pricing")}
                className={`flex-1 py-2 text-center font-medium transition ${
                  activeTab === "pricing"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pricing
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              className="mt-4 p-4 bg-gray-50 rounded-md shadow-inner min-h-[150px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === "description" ? (
                <motion.table
                  className="w-full text-gray-700 border-collapse"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Gold Used</td>
                      <td className="py-2 text-right">22K</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Hallmark</td>
                      <td className="py-2">
                        <div className="flex flex-col items-end gap-0 md:flex-row md:items-center md:justify-end md:gap-2">
                          <img
                            src={Hm916Icon}
                            alt="916 Hallmark"
                            className="w-5 h-5 object-contain"
                          />
                          <span className="block md:hidden text-right">
                            916 Hallmark
                          </span>
                          <span className="block md:hidden text-right">
                            Certified
                          </span>
                          <span className="hidden md:inline">
                            916 Hallmark Certified
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </motion.table>
              ) : (
                <motion.table
                  className="w-full text-gray-700 border-collapse"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Gold Price</td>
                      <td className="py-2 text-right">
                        ₹{goldCost.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Making Charges</td>
                      <td className="py-2 text-right">
                        ₹{makingCharges.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Subtotal</td>
                      <td className="py-2 text-right">
                        ₹{subtotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">GST (3%)</td>
                      <td className="py-2 text-right">
                        ₹{gst.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-t font-semibold text-yellow-600 text-lg">
                      <td className="py-2">Final Price</td>
                      <td className="py-2 text-right">
                        ₹{finalPrice.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </motion.table>
              )}
            </motion.div>

            {/* Centered Enquire Button */}
            <motion.button
              className="mt-6 px-6 py-3 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 transition mx-auto block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={() => navigate("/contact")}
            >
              Enquire Now
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MangalsutraDetails;
