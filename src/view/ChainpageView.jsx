import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load Chain category component
const Chains = lazy(() => import("../components/products/chains/Chain"));

export default function ChainpageView() {
  return (
    <>
      {/* --- SEO Metadata for Chains Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Chains – Mahadeo Sah Amarnath Prasad Jewellers | MAJ
          Online
        </title>

        <meta
          name="description"
          content="Shop premium 22k BIS 916 hallmarked gold chains at Mahadeo Sah Amarnath Prasad Jewellers (MAJ Online). Explore gents chains, ladies chains, sleek designs, fancy chains and daily wear gold chain collections."
        />

        <meta
          name="keywords"
          content="22k gold chain, BIS 916 gold chain, gents gold chain, ladies gold chain, hallmark gold chain, daily wear chain, sleek gold chain, fancy gold chain, pure gold jewellery, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/chains" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Chains – MAJ Online"
        />
        <meta
          property="og:description"
          content="Explore BIS 916 hallmarked 22k gold chains at Mahadeo Sah Amarnath Prasad Jewellers. Premium purity and trusted craftsmanship since 1911."
        />
        <meta property="og:url" content="https://majonline.in/chains" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Chains – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Shop BIS 916 hallmarked 22k gold chains crafted with high purity at MAJ Online."
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
            "name": "22k BIS 916 Gold Chains Collection",
            "description": "Explore BIS 916 hallmarked 22k gold chains by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/chains",
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
          <Chains />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
