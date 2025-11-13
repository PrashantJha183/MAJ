// components/pages/Jewellery/RingDetails.jsx
import React, { useState, useCallback, useEffect, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const RingDetails = memo(() => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ring = state?.ring;
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [goldPricePerGram, setGoldPricePerGram] = useState(null);

  if (!ring) {
    navigate("/rings");
    return null;
  }

  // Fetch latest gold price per gram
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gold/latest-per-gram`)
      .then((res) => res.json())
      .then((data) => {
        setGoldPricePerGram(data.pricePerGram);
      })
      .catch((err) =>
        console.error("Failed to fetch gold price per gram", err)
      );
  }, []);

  // Preload images
  useEffect(() => {
    ring.images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setLoadedImages((prev) => ({
          ...prev,
          [src]: true,
        }));
    });
  }, [ring.images]);

  // Image navigation
  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % ring.images.length);
  }, [ring.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev === 0 ? ring.images.length - 1 : prev - 1));
  }, [ring.images.length]);

  // Pricing calculation
  const goldCost =
    goldPricePerGram && ring.netWeight ? ring.netWeight * goldPricePerGram : 0;
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
            <ArrowLeft size={20} /> Back to Rings
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Image Gallery */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md bg-gray-100 select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={ring.images[currentImage]}
                src={ring.images[currentImage]}
                alt={`${ring.name} - view ${currentImage + 1}`}
                draggable={false}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  loadedImages[ring.images[currentImage]]
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
                {ring.images.map((_, index) => (
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
              {ring.name}
            </motion.h1>

            {/* Net Weight */}
            <motion.p
              className="text-sm text-gray-500 mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Net Weight: {ring.netWeight ? `${ring.netWeight} grams` : "N/A"}
            </motion.p>

            {/* Pricing Breakdown */}
            <motion.div
              className="mt-4 text-gray-700 space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p>Gold Price = ₹{goldCost.toLocaleString()}</p>
              <p>Making Charges = ₹{makingCharges.toLocaleString()}</p>
              <p>Subtotal = ₹{subtotal.toLocaleString()}</p>
              <p>GST = ₹{gst.toLocaleString()}</p>
              <p className="font-semibold text-yellow-600 text-lg mt-2">
                Final Price = ₹{finalPrice.toLocaleString()}
              </p>
            </motion.div>

            <motion.p
              className="mt-6 text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {ring.description}
            </motion.p>

            <motion.button
              className="mt-8 px-6 py-3 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Enquire Now
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RingDetails;
