import React from "react";
import { Facebook, Instagram } from "lucide-react";

const footerLinks = [
  { label: "About Us", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Contact", href: "#contact" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1adnrV18Fy/",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/maj_rajnagar",
    label: "Instagram",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative maroon-background text-white py-16 px-6 new-font overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-30"
        style={{
          backgroundImage: "url('/assets/footer-bg.jpg')",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Brand & Description */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-3">
            Mahadeo Sah Amarnath Jewellers
          </h2>
          <p className="text-gray-100 text-sm md:text-base leading-relaxed">
            Crafting timeless jewelry since 1911, celebrating heritage, trust,
            and exquisite craftsmanship for generations.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex-1">
          <h3 className="font-semibold mb-3 text-gray-100">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((link, idx) => (
              <li key={idx} className="transition-all cursor-pointer">
                <a
                  href={link.href}
                  className="text-gray-100 hover:text-yellow-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative mt-12 text-gray-100 text-sm md:text-base border-t border-gray-500 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Mobile First Order */}
          {/* Social Icons (top in mobile) */}
          <div className="order-1 md:order-3 w-full md:w-1/3 flex justify-center md:justify-end gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-yellow-300 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Copyright (middle in mobile) */}
          <div className="order-2 md:order-1 w-full md:w-1/3 flex justify-center md:justify-start">
            <p>
              © {currentYear} Mahadeo Sah Amarnath Jewellers. All Rights
              Reserved.
            </p>
          </div>

          {/* Designed & Developed (bottom in mobile) */}
          <div className="order-3 md:order-2 w-full md:w-1/3 flex justify-center">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
