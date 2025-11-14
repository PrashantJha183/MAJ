import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Rings = lazy(() => import("../components/products/rings/Rings"));

export default function RingspageView() {
  return (
    <>
      {/* --- SEO Metadata for Rings Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Rings – Mahadeo Sah Amarnath Prasad Jewellers | MAJ
          Online
        </title>

        <meta
          name="description"
          content="Shop BIS 916 hallmarked 22k gold rings at MAJ Online. Explore men's gold rings, women's gold rings, daily wear rings, engagement rings, solitaire-style rings and handcrafted designs."
        />

        <meta
          name="keywords"
          content="22k gold rings, BIS 916 gold ring, men's gold ring, women's gold ring, daily wear ring, engagement ring, hallmark ring, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/rings" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Rings – MAJ Online"
        />
        <meta
          property="og:description"
          content="Discover handcrafted BIS 916 hallmarked 22k gold rings for men and women at MAJ Online."
        />
        <meta property="og:url" content="https://majonline.in/rings" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Rings – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Explore a variety of BIS 916 hallmarked 22k gold rings at MAJ Online."
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
            "name": "22k BIS 916 Gold Rings Collection",
            "description": "A premium collection of BIS 916 hallmarked 22k gold rings by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/rings",
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
          <Rings />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
