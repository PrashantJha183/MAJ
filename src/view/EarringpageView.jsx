import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Earrings component
const Earrings = lazy(() => import("../components/products/earrings/Earring"));

export default function EarringpageView() {
  return (
    <>
      {/* --- SEO Metadata for Earrings Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Earrings – Mahadeo Sah Amarnath Prasad Jewellers |
          MAJ Online
        </title>

        <meta
          name="description"
          content="Shop 22k BIS 916 hallmarked gold earrings at MAJ Online. Explore studs, bali earrings, jhumkas, lightweight daily wear earrings, modern designs and classic handcrafted pieces."
        />

        <meta
          name="keywords"
          content="22k gold earrings, BIS 916 earrings, hallmark gold earrings, stud earrings, gold bali, jhumka earrings, ladies earrings, daily wear gold earrings, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/earrings" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Earrings – MAJ Online"
        />
        <meta
          property="og:description"
          content="Explore BIS 916 hallmarked 22k gold earrings including studs, bali, jhumka and designer collections at MAJ Online."
        />
        <meta property="og:url" content="https://majonline.in/earrings" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Earrings – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Shop BIS 916 hallmarked 22k gold earrings crafted with purity and tradition at MAJ Online."
        />
        <meta name="twitter:image" content="https://majonline.in/logo.jpg" />

        {/* Google Indexing */}
        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "22k BIS 916 Gold Earrings Collection",
            "description": "BIS 916 hallmarked 22k gold earrings by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/earrings",
            "image": "https://majonline.in/logo.jpg",
            "publisher": {
              "@type": "JewelryStore",
              "name": "Mahadeo Sah Amarnath Prasad Jewellers",
              "url": "https://majonline.in",
              "sameAs": [
                "https://www.instagram.com/maj_rajnagar",
                "https://www.facebook.com/share/1adnrV18Fy/"
              ]
            }
          }
          `}
        </script>
      </Helmet>

      {/* --- Page Content (Lazy-loaded) --- */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Earrings />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
