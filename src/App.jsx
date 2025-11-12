// App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import ErrorBoundary from "./components/base/ErrorBoundary";
import SkeletonLoader from "./components/base/SkeletonLoader";

// --- Import regular pages normally ---
import Home from "./view/HomepageView";
import About from "./view/AboutpageView";
import Contact from "./view/ContactpageView";
import Product from "./view/ProductpageView";
import Rings from "./view/RingspageView";
import AdminLogin from "./view/AdminLoginpageView";
import AdminDashboard from "./view/AdminDashboardpageView";
import AdminGoldHistory from "./view/AdminGoldHistorypageView";

// --- Lazy load for RingDetails (code splitting) ---
const RingDetails = lazy(() =>
  import("./components/products/rings/RingDetails")
);

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
            <Route path="/rings" element={<Rings />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/gold-history" element={<AdminGoldHistory />} />

            {/* RingDetails — Lazy Loaded + ErrorBoundary + Skeleton */}
            <Route
              path="/rings/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <RingDetails />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
