import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/base/ErrorBoundary";
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import SkeletonLoader from "./components/base/SkeletonLoader";

// Lazy load pages
const Home = lazy(() => import("./view/HomepageView"));
const About = lazy(() => import("./view/AboutpageView"));
const Contact = lazy(() => import("./view/ContactpageView"));
const Product = lazy(() => import("./view/ProductpageView"));
// Scroll to top on route change
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "none" });
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

              <Route
                path="/products"
                element={
                  <ErrorBoundary>
                    <Product />
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
