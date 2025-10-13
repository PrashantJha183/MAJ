// components/base/Header.jsx
import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Home, Info, Phone } from "lucide-react";
import Logo from "../../assets/MAJ_Logo_for_web.png";
import photos from "../../assets/DSC_8896.JPG";

const categoriesSource = [
  { name: "Rings", img: photos, alt: "Rings" },
  {
    name: "Necklaces",
    img: photos,
    alt: "Necklaces",
  },
  { name: "Pendants", img: photos, alt: "Pendants" },
  { name: "Earrings", img: photos, alt: "Earrings" },
  {
    name: "Bracelets",
    img: photos,
    alt: "Bracelets",
  },
];

const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E";

// Category Item with lazy load & skeleton
// Category Item with skeleton loader and local images fix
const CategoryItem = React.memo(function CategoryItem({ item }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center min-w-[70px]">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500 shadow-sm bg-gray-100 flex items-center justify-center m-2 transition-transform duration-300 hover:scale-105">
        {!loaded && <div className="animate-pulse w-full h-full bg-gray-200" />}
        <img
          src={item.img || FALLBACK_SRC}
          alt={item.alt || item.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
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
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const categories = useMemo(() => categoriesSource, []);

  const toggleMenu = useCallback(() => setMenuOpen((s) => !s), []);
  const openSearchMobile = useCallback(() => {
    setSearchOpenMobile(true);
    setMenuOpen(false);
  }, []);
  const closeSearchMobile = useCallback(() => setSearchOpenMobile(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const onSearchSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      console.log("search submit:", searchQuery);
      setSearchOpenMobile(false);
    },
    [searchQuery]
  );

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-white fixed top-0 z-50 border-b new-font">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-4 py-3 md:py-4">
          {/* LEFT - Logo */}
          <div className="flex items-center flex-1">
            <Link
              to="/"
              className="inline-flex items-center" // reduced space: 2 for mobile, 4 for desktop
              aria-label="Go to homepage"
            >
              <div className="relative w-24 md:w-36 h-12 md:h-20 flex-shrink-0">
                {" "}
                {/* slightly smaller width/height for mobile */}
                <img
                  src={Logo}
                  alt="Mahadeo Sah Amarnath Jewellers Logo"
                  className="object-contain w-full h-full"
                  loading="lazy"
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

          {/* CENTER - Search */}
          <div className="flex-1 flex justify-center px-4">
            <form
              className="hidden md:flex items-center w-full max-w-xl bg-white border rounded-full px-3 py-1 shadow-sm"
              onSubmit={onSearchSubmit}
            >
              <Search className="text-gray-500 mr-2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jewelry, rings, necklaces..."
                className="w-full text-sm focus:outline-none"
              />
            </form>

            {/* Mobile fake search */}
            <button
              onClick={openSearchMobile}
              className="md:hidden w-full max-w-lg flex items-center justify-center bg-white border rounded-full px-3 py-1 shadow-sm"
              aria-label="Open search"
            >
              <Search className="text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">Search</span>
            </button>
          </div>

          {/* RIGHT - Desktop nav + Mobile menu */}
          <div className="flex-1 flex justify-end items-center">
            {/* Desktop nav */}
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

            {/* Mobile hamburger */}
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
              >
                <span
                  className={`block absolute w-6 h-0.5 bg-black transform transition-transform duration-300 ${
                    menuOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`block absolute w-6 h-0.5 bg-black transform transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute w-6 h-0.5 bg-black transform transition-transform duration-300 ${
                    menuOpen ? "-rotate-45" : "translate-y-2"
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
              <CategoryItem key={c.name} item={c} />
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH PANEL */}
      <div
        className={`fixed left-0 right-0 top-16 z-40 md:hidden transition-transform duration-300 ${
          searchOpenMobile
            ? "transform translate-y-0"
            : "transform -translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-4 mb-2 bg-white shadow-lg border rounded-lg p-3">
          <form
            onSubmit={onSearchSubmit}
            className="flex items-center space-x-2"
          >
            <Search className="text-gray-500" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm focus:outline-none"
              placeholder="Search for rings, necklaces..."
            />
            <button
              type="button"
              onClick={closeSearchMobile}
              className="text-sm text-gray-600 px-3 py-1"
            >
              Close
            </button>
          </form>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 md:hidden pointer-events-none`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-11/12 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-lg font-medium">Menu</h2>
            <button
              onClick={closeMenu}
              className="w-8 h-8 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="p-4 space-y-4">
            <div className="pt-4 flex flex-col gap-3">
              {categories.map((c) => (
                <button
                  key={c.name}
                  onClick={closeMenu}
                  className="flex items-center gap-4 px-3 py-2 rounded-md w-full text-md"
                >
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-14 h-14 rounded-full object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = FALLBACK_SRC)}
                  />
                  <span className="flex-1 text-left">{c.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-inner md:hidden">
        <div className="max-w-screen-xl mx-auto flex justify-around">
          <Link
            to="/"
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

      {/* Spacer to prevent overlap */}
      <div className="pt-0 md:pt-20 pb-0 md:pb-0" />
    </>
  );
};

export default React.memo(Header);
