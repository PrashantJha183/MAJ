import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Necklaces component
const Necklaces = lazy(() =>
  import("../components/products/necklaces/Necklace")
);

export default function NecklacepageView() {
  return (
    <>
      {/* --- SEO Metadata for Necklaces Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Necklaces – Mahadeo Sah Amarnath Prasad Jewellers |
          MAJ Online
        </title>

        <meta
          name="description"
          content="Shop 22k BIS 916 hallmarked gold necklaces at MAJ Online. Explore bridal gold necklaces, lightweight daily wear designs, traditional sets, antique gold necklaces and handcrafted jewellery."
        />

        <meta
          name="keywords"
          content="22k gold necklace, BIS 916 necklace, gold necklace set, bridal gold necklace, lightweight gold necklace, traditional gold jewellery, hallmark necklace, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/necklaces" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Necklaces – MAJ Online"
        />
        <meta
          property="og:description"
          content="Explore handcrafted BIS 916 hallmarked gold necklaces including bridal, antique and modern lightweight designs."
        />
        <meta property="og:url" content="https://majonline.in/necklaces" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Necklaces – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Shop premium BIS 916 hallmarked 22k gold necklaces at MAJ Online."
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
            "name": "22k BIS 916 Gold Necklaces Collection",
            "description": "A curated collection of BIS 916 hallmarked 22k gold necklaces by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/necklaces",
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
          <Necklaces />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
