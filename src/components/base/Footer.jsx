import React, { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import Logo from "../../assets/MAJ Logo FIle.svg";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "About Us", link: "/about" },
  { label: "Collections", link: "/products" },
  { label: "Contact", link: "/contact" },
  { label: "Terms & Conditions", link: "/products" },
  { label: "Privacy Policy", link: "/products" },
  { label: "Login", link: "/login" },
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
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <footer
      className="relative maroon-background text-white py-16 px-6 new-font overflow-hidden"
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-30 transition-all duration-700"
        style={{
          backgroundImage: "url('/assets/footer-bg.jpg')",
          backgroundColor: "#4b0000",
        }}
        aria-hidden="true"
      ></div>

      {/* Main Content */}
      <section
        className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Mahadeo Sah Amarnath Jewellers Footer Section
        </h2>

        {/* Column 1: Logo & Description */}
        <div className="flex-1">
          <Link
            to="/"
            aria-label="Go to Home Page"
            className="inline-flex items-center gap-3"
          >
            {/* Logo */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
              {!logoLoaded && (
                <div className="absolute inset-0 bg-gray-400 animate-pulse rounded-full blur-sm"></div>
              )}

              <img
                src={Logo}
                alt="Mahadeo Sah Amarnath Jewellers Logo"
                loading="lazy"
                className={`object-contain w-full h-full transition-opacity duration-700 ${
                  logoLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLogoLoaded(true)}
              />
            </div>

            {/* Text */}
            <h1
              className="text-xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "Domine" }}
            >
              Mahadeo Sah Amarnath Prasad Jewellers
            </h1>
          </Link>

          {/* <p className="hidden sm:block text-gray-100 text-sm md:text-base leading-relaxed mt-4 text-center">
            Crafting timeless jewelry since 1911 celebrating trust, heritage,
            and exquisite craftsmanship across generations.
          </p> */}
        </div>

        {/* Column 2: Quick Links (first 3 links) */}
        <nav className="flex-1 md:text-center" aria-label="Quick Links">
          <h3 className="font-semibold mb-3 text-gray-100 text-lg">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.slice(0, 3).map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.link}
                  className="text-gray-100 hover:text-yellow-200 transition-all"
                  title={`Visit ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: More Links (last 3 links) */}
        <nav className="flex-1 md:text-center" aria-label="More Links">
          <h3 className="font-semibold mb-3 text-gray-100 text-lg">
            More Links
          </h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.slice(3).map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.link}
                  className="text-gray-100 hover:text-yellow-200 transition-all"
                  title={`Visit ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Footer Bottom */}
      <div className="relative mt-12 text-gray-100 text-sm md:text-base border-t border-gray-500 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Social Icons */}
          <div
            className="order-1 md:order-3 w-full md:w-1/3 flex justify-center md:justify-end gap-4"
            aria-label="Social Media Links"
          >
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-gray-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-yellow-300 transition-colors"
                  aria-label={`Visit ${social.label} page`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="order-2 md:order-1 w-full md:w-1/3 flex justify-center md:justify-start">
            <p>
              © {currentYear} Mahadeo Sah Amarnath Jewellers — All Rights
              Reserved.
            </p>
          </div>

          {/* Designed & Developed */}
          <div className="order-3 md:order-2 w-full md:w-1/3 flex justify-center">
            <p>
              Designed & Developed by{" "}
              <a
                href="https://www.bazaardigital.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-yellow-300 hover:underline"
                title="Visit Bazaar Digital website"
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
