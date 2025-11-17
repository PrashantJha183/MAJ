import React, { Suspense, lazy, useEffect } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load homepage components (unchanged)
const Hero = lazy(() => import("../components/homepage/Hero"));
const Gift = lazy(() => import("../components/homepage/Gift"));
const Band = lazy(() => import("../components/homepage/Band"));
const BestSellers = lazy(() => import("../components/homepage/BestSellers"));
const Promotion = lazy(() => import("../components/homepage/Promotions"));
// Preload components for instant load after Hero renders (unchanged)
Hero.preload = () => import("../components/homepage/Hero");
Gift.preload = () => import("../components/homepage/Gift");
Band.preload = () => import("../components/homepage/Band");
BestSellers.preload = () => import("../components/homepage/BestSellers");

const HomepageView = () => {
  // Preload all heavy homepage components immediately after mount (unchanged)
  useEffect(() => {
    setTimeout(() => {
      Hero.preload();
      BestSellers.preload();
      Gift.preload();
      Band.preload();
    }, 50);
  }, []);

  // ==========================
  // SEO + GSC INDEXING SETUP
  // ==========================
  useEffect(() => {
    // ---- Page Title ----
    document.title =
      "Mahdeo Sah Amarnath Prasad Jewellers | Premium Gold, Silver & Diamond Jewellery";

    // ---- Meta Description ----
    const metaDesc =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content =
      "Mahdeo Sah Amarnath Prasad Jewellers offers premium gold, silver, and diamond jewellery collections. Explore necklaces, rings, bangles, pendants & more crafted with unmatched purity and elegance.";
    document.head.appendChild(metaDesc);

    // ---- Canonical (Required for GSC indexing priority) ----
    const canonical =
      document.querySelector("link[rel='canonical']") ||
      document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = window.location.href;
    document.head.appendChild(canonical);

    // ---- JSON-LD Structured Data (Boosts rankings + trust) ----
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "JewelryStore",
      name: "Mahdeo Sah Amarnath Prasad Jewellers",
      description:
        "Premium gold, silver and diamond jewellery from trusted and renowned jewellers.",
      url: window.location.href,
      image: "https://your-domain.com/main-banner.jpg",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.instagram.com/maj_rajnagar",
        "https://www.facebook.com/share/1adnrV18Fy/",
      ],
    });
    document.head.appendChild(script);
  }, []);

  return (
    <>
      {/* HERO - highest SEO impact section */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader priority="high" />}>
          <Hero />
        </Suspense>
      </ErrorBoundary>

      {/* BEST SELLERS - important for homepage SEO */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <BestSellers />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Promotion />
        </Suspense>
      </ErrorBoundary>

      {/* GIFT SECTION */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Gift />
        </Suspense>
      </ErrorBoundary>

      {/* BAND SECTION */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Band />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomepageView;
