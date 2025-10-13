import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/base/ErrorBoundary";

// Base layout components
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

// Lazy load pages for performance optimization
const Hero = lazy(() => import("./components/homepage/Hero"));
const About = lazy(() => import("./components/base/About"));
const Contact = lazy(() => import("./components/base/Contact"));

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    <div className="h-64 bg-gray-200 rounded"></div>
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {/* Error boundary for header */}
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <main className="pt-20 pb-14 md:pb-0">
        {/* Error boundary for main content */}
        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Error boundary for footer */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
