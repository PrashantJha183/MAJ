import React, { useState, useRef, useEffect, memo } from "react";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useSwipeable } from "react-swipeable";
import ReelVideo from "../../assets/Reels.mp4";
import { motion, AnimatePresence } from "framer-motion";

const REELS = [
  {
    id: 1,
    title: "Elegant Necklace",
    src: ReelVideo,
    thumbnail: "/images/thumb1.jpg",
  },
  {
    id: 2,
    title: "Stylish Watch",
    src: ReelVideo,
    thumbnail: "/images/thumb2.jpg",
  },
  {
    id: 3,
    title: "Fashion Bag",
    src: ReelVideo,
    thumbnail: "/images/thumb3.jpg",
  },
];

const Reel = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    setIsLoading(true);
    vid.load();
    vid.play().catch(() => {});
    setIsPlaying(true);
  }, [current]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) vid.pause();
    else vid.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLoaded = () => {
    setIsLoading(false);
    const vid = videoRef.current;
    if (vid && vid.paused) vid.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleNext = () => setCurrent((prev) => (prev + 1) % REELS.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + REELS.length) % REELS.length);

  // helper for circular indexing
  const getReel = (indexOffset) =>
    REELS[(current + indexOffset + REELS.length) % REELS.length];

  return (
    <section
      {...handlers}
      className="w-full flex justify-center mt-10 px-4 overflow-hidden"
    >
      {/* Carousel Wrapper */}
      <div className="relative flex items-center justify-center w-full max-w-5xl h-[70vh]">
        {/* Left Reel (Previous) */}
        <motion.div
          key={`left-${getReel(-1).id}`}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "-30%", opacity: 0.6, scale: 0.8 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block absolute w-[55%] max-w-md rounded-2xl overflow-hidden bg-black shadow-lg z-0"
        >
          <video
            src={getReel(-1).src}
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>

        {/* Center Reel (Current) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={REELS[current].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md rounded-2xl shadow-xl overflow-hidden bg-black aspect-video z-10"
          >
            {/* Thumbnail while loading */}
            {isLoading && REELS[current].thumbnail && (
              <img
                src={REELS[current].thumbnail}
                alt={REELS[current].title}
                className="absolute w-full h-full object-cover blur-md"
              />
            )}

            {/* Current Video */}
            <video
              ref={videoRef}
              src={REELS[current].src}
              className="w-full h-full object-cover"
              muted={isMuted}
              autoPlay
              playsInline
              preload="metadata"
              loop
              onLoadedData={handleLoaded}
            />

            {/* Play / Mute Buttons */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-20">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="text-white text-3xl p-3 bg-black/30 rounded-full hover:bg-black/50 transition"
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="text-white text-3xl p-3 bg-black/30 rounded-full hover:bg-black/50 transition"
              >
                {isMuted ? <FiVolumeX /> : <FiVolume2 />}
              </button>
            </div>

            <h2 className="sr-only">{REELS[current].title}</h2>
          </motion.div>
        </AnimatePresence>

        {/* Right Reel (Next) */}
        <motion.div
          key={`right-${getReel(1).id}`}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "30%", opacity: 0.6, scale: 0.8 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block absolute w-[55%] max-w-md rounded-2xl overflow-hidden bg-black shadow-lg z-0"
        >
          <video
            src={getReel(1).src}
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute inset-0 justify-between items-center px-8 z-30">
          <button
            onClick={handlePrev}
            aria-label="Previous Reel"
            className="text-black text-4xl p-3 bg-black/30 rounded-full hover:bg-black/50 transition"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Reel"
            className="text- text-4xl p-3 bg-black/30 rounded-full hover:bg-black/50 transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(Reel);
