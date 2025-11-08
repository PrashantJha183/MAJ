// components/base/Header.jsx
import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Phone } from "lucide-react";
import Logo from "../../assets/MAJ_Logo_for_Web.png";
import ring from "../../assets/DSC_9099.JPG";
import maangtika from "../../assets/DSC_8885.JPG";
import nathani from "../../assets/DSC_8925.JPG";
import earrings from "../../assets/DSC_9084.JPG";
import necklace from "../../assets/DSC_9118.JPG";
import managlsutra from "../../assets/DSC_9030.JPG";

const categoriesSource = [
  { name: "Rings", img: ring, alt: "Rings", link: "/rings" },
  { name: "Necklaces", img: necklace, alt: "Necklaces", link: "/products" },
  { name: "Earrings", img: earrings, alt: "Earrings", link: "/products" },
  {
    name: "Mangalsutra",
    img: managlsutra,
    alt: "Mangalsutra",
    link: "/products",
  },
  { name: "Maangtika", img: maangtika, alt: "Maangtika", link: "/products" },
  { name: "Nath", img: nathani, alt: "Nathani", link: "/products" },
];

const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E";

// --- Category Item ---
const CategoryItem = React.memo(function CategoryItem({ item }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex flex-col items-center min-w-[70px]">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500 shadow-sm bg-gray-100 flex items-center justify-center m-2 transition-transform duration-300 hover:scale-105">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        )}
        <img
          src={item.img || FALLBACK_SRC}
          alt={item.alt || item.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            loaded ? "blur-0 opacity-100" : "blur-2xl opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => (e.currentTarget.src = FALLBACK_SRC)}
        />
      </div>
      <span className="text-sm mt-1">{item.name}</span>
    </div>
  );
});

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false); // prevents double-click race
  const location = useLocation();
  const categories = useMemo(() => categoriesSource, []);

  const toggleMenu = useCallback(() => {
    if (animating) return; // block rapid clicks
    setAnimating(true);
    setMenuOpen((prev) => !prev);
    setTimeout(() => setAnimating(false), 300); // matches transition duration
  }, [animating]);

  const closeMenu = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setMenuOpen(false);
    setTimeout(() => setAnimating(false), 300);
  }, [animating]);

  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <>
      <header className="w-full bg-white fixed top-0 z-50 border-b new-font">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-4 py-3 md:py-4">
          {/* LEFT - Logo */}
          <div className="flex items-center flex-1">
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="Go to homepage"
              onClick={closeMenu}
            >
              <div className="relative w-24 md:w-36 h-12 md:h-20 flex-shrink-0">
                {!logoLoaded && (
                  <img
                    src={Logo}
                    alt="Logo placeholder"
                    className="absolute inset-0 w-full h-full object-contain filter blur-2xl opacity-30"
                    aria-hidden="true"
                  />
                )}
                <img
                  src={Logo}
                  alt="Mahadeo Sah Amarnath Jewellers Logo"
                  className={`object-contain w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    logoLoaded ? "blur-0 opacity-100" : "blur-2xl opacity-0"
                  }`}
                  loading="eager"
                  onLoad={() => setLogoLoaded(true)}
                  onError={(e) => (e.currentTarget.src = FALLBACK_SRC)}
                />
              </div>

              <div
                className="hidden md:flex flex-col"
                style={{ fontFamily: "Domine" }}
              >
                <span className="text-lg font-semibold maroon-color leading-tight">
                  Mahadeo Sah
                </span>
                <span className="text-lg font-semibold maroon-color leading-tight">
                  Amarnath Prasad
                </span>
                <span className="text-lg font-semibold maroon-color leading-tight">
                  Jewellers
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT - Nav */}
          <div className="flex-1 flex justify-end items-center">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 font-medium">
              <Link
                to="/"
                className={`hover:text-yellow-600 transition-all ${
                  location.pathname === "/"
                    ? "text-yellow-700 border-b-2 border-yellow-700 pb-1"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`hover:text-yellow-600 transition-all ${
                  location.pathname === "/about"
                    ? "text-yellow-700 border-b-2 border-yellow-700 pb-1"
                    : ""
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`hover:text-yellow-600 transition-all ${
                  location.pathname === "/contact"
                    ? "text-yellow-700 border-b-2 border-yellow-700 pb-1"
                    : ""
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2 z-[60]">
              <button
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
              >
                <span
                  className={`block absolute w-6 h-0.5 bg-black transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`block absolute w-6 h-0.5 bg-black transition-opacity duration-300 ease-in-out ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute w-6 h-0.5 bg-black transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP CATEGORIES */}
        <div className="hidden md:block border-t bg-gray-50">
          <div className="max-w-screen-xl mx-auto flex items-center justify-center gap-6 py-3 px-4 overflow-x-auto">
            {categories.map((c) => (
              <Link key={c.name} to={c.link}>
                <CategoryItem item={c} />
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY + SLIDE-IN */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
            menuOpen ? "opacity-40" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-11/12 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="p-4 space-y-4 mt-10">
            <div className="pt-6 flex flex-col gap-3">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  to={c.link}
                  onClick={closeMenu}
                  className="flex items-center gap-4 px-3 py-3 rounded-md w-full text-md transition-all duration-300 hover:bg-gray-100"
                >
                  <CinematicImage src={c.img} alt={c.name} />
                  <span className="flex-1 text-left">{c.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-inner md:hidden">
        <div className="max-w-screen-xl mx-auto flex justify-around">
          <Link
            to="/"
            onClick={closeMenu}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-all ${
              location.pathname === "/"
                ? "maroon-background text-white"
                : "maroon-color"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-all ${
              location.pathname === "/contact"
                ? "maroon-background text-white"
                : "maroon-color"
            }`}
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs font-medium">Contact</span>
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-all ${
              location.pathname === "/about"
                ? "maroon-background text-white"
                : "maroon-color"
            }`}
          >
            <Info className="w-6 h-6" />
            <span className="text-xs font-medium">About</span>
          </Link>
        </div>
      </nav>

      <div className="pt-0 md:pt-20 pb-0 md:pb-0" />
    </>
  );
};

// Reusable blur-loading image
const CinematicImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      )}
      <img
        src={src || FALLBACK_SRC}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          loaded ? "blur-0 opacity-100" : "blur-2xl opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => (e.currentTarget.src = FALLBACK_SRC)}
      />
    </div>
  );
};

export default React.memo(Header);
