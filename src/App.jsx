import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/base/ErrorBoundary";

// Base layout components
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

// Lazy load pages for performance optimization
const Home = lazy(() => import("./view/HomepageView"));
const About = lazy(() => import("./components/base/About"));
const Contact = lazy(() => import("./components/base/Contact"));

// Shimmer Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 space-y-6">
    {/* Large header placeholder */}
    <div className="h-8 w-3/4 rounded relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
    </div>
    <div className="h-8 w-1/2 rounded relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
    </div>
    <div className="h-64 w-full rounded relative overflow-hidden mt-6">
      <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
    </div>
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="h-32 w-full rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
      <div className="h-32 w-full rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
    </div>
    {/* Shimmer CSS */}
    <style>{`
      .animate-shimmer {
        background: linear-gradient(90deg, rgba(229,229,229,1) 0%, rgba(200,200,200,0.6) 50%, rgba(229,229,229,1) 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </div>
);

// ScrollToTop component: scrolls to top on route change
const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>

        <main className="pt-20 pb-14 md:pb-0">
          <Suspense fallback={<SkeletonLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/about"
                element={
                  <ErrorBoundary>
                    <About />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/contact"
                element={
                  <ErrorBoundary>
                    <Contact />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        </main>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
