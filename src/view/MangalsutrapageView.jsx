import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Mangalsutra component
const Mangalsutras = lazy(() =>
  import("../components/products/mangalsutras/Mangalsutra")
);

export default function MangalsutrapageView() {
  return (
    <>
      {/* --- SEO Metadata for Mangalsutra Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Mangalsutras – Mahadeo Sah Amarnath Prasad Jewellers
          | MAJ Online
        </title>

        <meta
          name="description"
          content="Shop 22k BIS 916 hallmarked gold mangalsutras at MAJ Online. Explore traditional, modern, lightweight, and handcrafted mangalsutra designs with authentic gold purity."
        />

        <meta
          name="keywords"
          content="22k gold mangalsutra, BIS 916 mangalsutra, gold mangalsutra designs, lightweight gold mangalsutra, modern mangalsutra, traditional gold mangalsutra, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/mangalsutras" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Mangalsutras – MAJ Online"
        />
        <meta
          property="og:description"
          content="Explore BIS 916 hallmarked 22k gold mangalsutra designs including traditional, modern, and lightweight styles."
        />
        <meta property="og:url" content="https://majonline.in/mangalsutras" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Mangalsutras – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Shop handcrafted BIS 916 hallmarked 22k gold mangalsutras at MAJ Online."
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
            "name": "22k BIS 916 Gold Mangalsutras Collection",
            "description": "BIS 916 hallmarked 22k gold mangalsutra collection by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/mangalsutras",
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
          <Mangalsutras />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
