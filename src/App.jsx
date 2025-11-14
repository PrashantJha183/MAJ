// App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// --- Critical UI (non-lazy) ---
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import ErrorBoundary from "./components/base/ErrorBoundary";
import SkeletonLoader from "./components/base/SkeletonLoader";

// --- Eager-load only top visited SEO pages ---
import Home from "./view/HomepageView";
import About from "./view/AboutpageView";
import Contact from "./view/ContactpageView";
import Product from "./view/ProductpageView";

// Category Pages (SEO pages should not be lazy-loaded)
import Rings from "./view/RingspageView";
import ChainpageView from "./view/ChainpageView";
import MaangtikapageView from "./view/MaangtikapageView";
import NathpageView from "./view/NathpageView";
import EarringpageView from "./view/EarringpageView";
import MangalsutrapageView from "./view/MangalsutrapageView";
import NecklacepageView from "./view/NecklacepageView";

// Admin pages (low traffic: lazy load)
const AdminLogin = lazy(() => import("./view/AdminLoginpageView"));
const AdminDashboard = lazy(() => import("./view/AdminDashboardpageView"));
const AdminGoldHistory = lazy(() => import("./view/AdminGoldHistorypageView"));

// Product Details (heavy JS → always lazy)
const RingDetails = lazy(() =>
  import("./components/products/rings/RingDetails")
);
const ChainDetails = lazy(() =>
  import("./components/products/chains/ChainDetails")
);
const MaangtikaDetails = lazy(() =>
  import("./components/products/mangtikas/MaangtikaDetails")
);
const NathDetails = lazy(() =>
  import("./components/products/naths/NathDetails")
);
const EarringDetails = lazy(() =>
  import("./components/products/earrings/EarringDetails")
);
const MangalsutraDetails = lazy(() =>
  import("./components/products/mangalsutras/MangalsutraDetails")
);

// Scroll to Top
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
        <Header />

        <main className="pt-20 pb-14 md:pb-0">
          <Routes>
            {/* Direct SEO Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Product />} />

            {/* Category Pages */}
            <Route path="/rings" element={<Rings />} />
            <Route path="/chains" element={<ChainpageView />} />
            <Route path="/maangtikas" element={<MaangtikapageView />} />
            <Route path="/naths" element={<NathpageView />} />
            <Route path="/earrings" element={<EarringpageView />} />
            <Route path="/mangalsutras" element={<MangalsutrapageView />} />
            <Route path="/necklaces" element={<NecklacepageView />} />

            {/* Lazy Loaded Admin Pages */}
            <Route
              path="/login"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <AdminLogin />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <AdminDashboard />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/admin/gold-history"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <AdminGoldHistory />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            {/* Product Details Lazy */}
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

            <Route
              path="/chains/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <ChainDetails />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/maangtikas/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <MaangtikaDetails />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/naths/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <NathDetails />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/earrings/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <EarringDetails />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/mangalsutras/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<SkeletonLoader />}>
                    <MangalsutraDetails />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Routes>
        </main>

        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
