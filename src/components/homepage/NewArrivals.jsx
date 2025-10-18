import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";
import ReelVideo from "../../assets/Reels.mp4";

// Sample video data
const NEW_ARRIVALS = [
  {
    id: 1,
    name: "Ethereal Diamond Pendant",
    src: ReelVideo,
    thumbnail: "/images/new1-low.jpg",
  },
  {
    id: 2,
    name: "Royal Gold Bangles",
    src: ReelVideo,
    thumbnail: "/images/new2-low.jpg",
  },
  {
    id: 3,
    name: "Emerald Necklace Set",
    src: ReelVideo,
    thumbnail: "/images/new3-low.jpg",
  },
  {
    id: 4,
    name: "Modern Pearl Earrings",
    src: ReelVideo,
    thumbnail: "/images/new4-low.jpg",
  },
];

export default function NewArrivals() {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});

  const handlePlayPause = (id) => {
    setCurrentPlaying((prev) => (prev === id ? null : id));
  };

  const toggleMute = (id) => {
    setVideoStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], muted: !prev[id]?.muted },
    }));
  };

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((id) => {
      const video = videoRefs.current[id];
      if (!video) return;
      if (parseInt(id) === currentPlaying) video.play().catch(() => {});
      else video.pause();
    });
  }, [currentPlaying]);

  const handleLoadedData = (id) => {
    setVideoStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], loaded: true },
    }));
  };

  return (
    <section className="new-font w-full py-16 new-arrival-bg">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-center text-3xl md:text-4xl font-extrabold maroon-color mb-10"
      >
        New Arrivals
      </motion.h2>

      <div className="flex gap-3 sm:gap-4 md:gap-6 px-8 sm:px-6 md:px-12 overflow-x-auto snap-x snap-mandatory">
        {NEW_ARRIVALS.map((item, i) => {
          const isLoaded = videoStates[item.id]?.loaded;
          const isMuted = videoStates[item.id]?.muted ?? true;
          const isPlaying = currentPlaying === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="relative flex-shrink-0 new-arrival-screen rounded-xl overflow-hidden white-bg shadow-md snap-start"
            >
              {/* Skeleton Loader */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
              )}

              {/* Thumbnail Blur */}
              {!isLoaded && (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover blur-md scale-105"
                />
              )}

              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[item.id] = el)}
                src={item.src}
                muted={isMuted}
                preload="auto"
                playsInline
                loop
                onLoadedData={() => handleLoadedData(item.id)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Centered Play/Pause Button with auto-hide */}
              <div
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto"
                onClick={() => {
                  handlePlayPause(item.id);

                  // Show button
                  setVideoStates((prev) => ({
                    ...prev,
                    [item.id]: {
                      ...prev[item.id],
                      showButton: true,
                    },
                  }));

                  // Auto-hide after 2.5 seconds
                  setTimeout(() => {
                    setVideoStates((prev) => ({
                      ...prev,
                      [item.id]: {
                        ...prev[item.id],
                        showButton: false,
                      },
                    }));
                  }, 2500);
                }}
              >
                {videoStates[item.id]?.showButton && (
                  <button className="bg-white/20 backdrop-blur-md rounded-full p-3 transition shadow-lg hover:bg-white/30 pointer-events-none">
                    {isPlaying ? (
                      <FiPause className="text-maroon play-icon" />
                    ) : (
                      <FiPlay className="text-maroon play-icon" />
                    )}
                  </button>
                )}
              </div>

              {/* Bottom Overlay: Name + Mute */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-white z-10">
                <span className="text-xs font-semibold bg-maroon/80 px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.name}
                </span>
                <button
                  className="bg-white/20 backdrop-blur-md rounded-full p-1.5 shadow-lg hover:bg-white/30 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from toggling play/pause
                    toggleMute(item.id);
                  }}
                >
                  {isMuted ? (
                    <FiVolumeX className="text-maroon sound-icon" />
                  ) : (
                    <FiVolume2 className="text-maroon sound-icon" />
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
