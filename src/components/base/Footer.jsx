import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Contact", href: "#contact" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      ref={ref}
      className="maroon-background text-white py-16 px-6 new-font"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10"
      >
        {/* Brand & Description */}
        <motion.div variants={itemVariants} className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-3">
            Mahadeo Sah Amarnath Jewellers
          </h2>
          <p className="text-gray-100 text-sm md:text-base leading-relaxed">
            Crafting timeless jewelry since 1911, celebrating heritage, trust,
            and exquisite craftsmanship for generations.
          </p>
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={itemVariants} className="flex-1">
          <h3 className="font-semibold mb-3 text-gray-100">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((link, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 5, color: "#FFD700" }}
                className="transition-all cursor-pointer"
              >
                <a
                  href={link.href}
                  className="text-gray-100 hover:text-yellow-200"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div variants={itemVariants} className="flex-1">
          <h3 className="font-semibold mb-3 text-gray-100">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, color: "#FFD700" }}
                  className="text-gray-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-yellow-300 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
      {/* Footer Bottom */}
      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-gray-100 text-sm md:text-base border-t border-gray-500 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left"
      >
        <p>
          © {currentYear} Mahadeo Sah Amarnath Jewellers. All Rights Reserved.
        </p>
        <p>
          Designed & Developed by{" "}
          <a
            href="https://www.bazaardigital.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-300"
          >
            Bazaar Digital
          </a>
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
