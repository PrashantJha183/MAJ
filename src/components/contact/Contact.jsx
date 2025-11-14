import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const Phone = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Phone }))
);
const Mail = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Mail }))
);
const MapPin = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.MapPin }))
);

const Contact = memo(() => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showEmailCopied, setShowEmailCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Detect desktop width
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // --- CLICK HANDLERS ---

  const handleCallClick = () => {
    if (!isDesktop) {
      window.location.href = "tel:+919973172805";
    }
  };

  const handleEmailClick = () => {
    if (!isDesktop) {
      window.location.href = "mailto:majonline@gmail.com";
    } else {
      navigator.clipboard.writeText("majonline@gmail.com");
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 1500);
    }
  };

  const handleAddressClick = () => {
    window.open(
      "https://www.google.com/maps?q=Gandhi+Chowk,+Rajnagar,+Madhubani,+Bihar+846004",
      "_blank"
    );
  };

  return (
    <main
      className="relative bg-white text-gray-800 py-20 md:py-28 new-font md:pt-40 overflow-hidden"
      id="contact"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif font-bold text-amber-800"
          >
            Contact <span className="text-yellow-600">Us</span>
          </motion.h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            We’d love to hear from you reach out with your questions or
            feedback.
          </p>
        </header>

        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-2 
            gap-10 
            md:gap-14 
            lg:gap-20 
            place-items-start
          "
        >
          {/* Call */}
          <Suspense
            fallback={
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 w-full cursor-pointer"
              onClick={handleCallClick}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700">
                  <Phone size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800">Call Us</h4>
                  <p className="text-gray-600">
                    +91 9973172805 / +91 7011913993
                  </p>
                </div>
              </div>
            </motion.div>
          </Suspense>

          {/* Email */}
          <Suspense
            fallback={
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 w-full cursor-pointer"
              onClick={handleEmailClick}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700">
                  <Mail size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800">Email</h4>
                  <p className="text-gray-600">majonline@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </Suspense>

          {/* Address */}
          <Suspense>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 w-full cursor-pointer"
              onClick={handleAddressClick}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700">
                  <MapPin size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800">Visit Us</h4>
                  <p className="text-gray-600">
                    Gandhi Chowk, Rajnagar, Madhubani, Bihar - 846004
                  </p>
                </div>
              </div>
            </motion.div>
          </Suspense>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/919973172805"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} className="mr-2" /> WhatsApp
          </motion.a>
        </div>
      </div>

      {/* Email Copied Popup */}
      {showEmailCopied && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-smoothFade"
          style={{ zIndex: "10000" }}
        >
          Email copied!
        </div>
      )}
    </main>
  );
});

export default Contact;
