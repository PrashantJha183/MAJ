import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

// --- Import all pages normally ---
import Home from "./view/HomepageView";
import About from "./view/AboutpageView";
import Contact from "./view/ContactpageView";
import Product from "./view/ProductpageView";

// --- Scroll to top on route change ---
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        {/* Header */}
        <Header />

        {/* Main Page Content */}
        <main className="pt-20 pb-14 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Product />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
