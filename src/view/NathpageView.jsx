import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Naths component
const Naths = lazy(() => import("../components/products/naths/Naths"));

export default function NathspageView() {
  return (
    <>
      {/* --- SEO Metadata for Naths Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Naths & Nose Rings – Mahadeo Sah Amarnath Prasad
          Jewellers | MAJ Online
        </title>

        <meta
          name="description"
          content="Shop 22k BIS 916 hallmarked gold naths and nose rings at MAJ Online. Explore traditional bridal naths, lightweight nose pins, daily wear naths, and handcrafted gold nose jewellery."
        />

        <meta
          name="keywords"
          content="22k gold nath, BIS 916 nath, gold nose ring, bridal nath, gold nose pin, traditional nath design, hallmark gold nath, nose jewellery, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/naths" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Naths & Nose Rings – MAJ Online"
        />
        <meta
          property="og:description"
          content="Explore BIS 916 hallmarked 22k gold naths, nose pins and nose rings including bridal and daily wear designs at MAJ Online."
        />
        <meta property="og:url" content="https://majonline.in/naths" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Naths & Nose Rings – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Shop handcrafted BIS 916 hallmarked gold naths and nose rings at MAJ Online."
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
            "name": "22k BIS 916 Gold Naths Collection",
            "description": "BIS 916 hallmarked 22k gold naths and nose rings by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/naths",
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
          <Naths />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
