import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Maangtika component
const Maangtikas = lazy(() =>
  import("../components/products/mangtikas/Maangtika")
);

export default function MaangtikapageView() {
  return (
    <>
      {/* --- SEO Metadata for Maangtika Category --- */}
      <Helmet>
        <title>
          22k BIS 916 Gold Maangtikas – Mahadeo Sah Amarnath Prasad Jewellers |
          MAJ Online
        </title>

        <meta
          name="description"
          content="Explore 22k BIS 916 hallmarked gold maangtikas at MAJ Online. Shop traditional maang tikkas, bridal designs, lightweight maangtikas, and handcrafted gold forehead jewellery."
        />

        <meta
          name="keywords"
          content="22k gold maangtika, BIS 916 maangtika, gold maang tikka, bridal maangtika, traditional gold maang tikka, hallmark maangtika, forehead jewellery, MAJ Online"
        />

        <link rel="canonical" href="https://majonline.in/maangtikas" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="22k BIS 916 Gold Maangtikas – MAJ Online"
        />
        <meta
          property="og:description"
          content="Shop BIS 916 hallmarked 22k gold maangtikas including bridal, traditional, and lightweight designs at MAJ Online."
        />
        <meta property="og:url" content="https://majonline.in/maangtikas" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="22k BIS 916 Gold Maangtikas – MAJ Online"
        />
        <meta
          name="twitter:description"
          content="Explore handcrafted BIS 916 hallmarked 22k gold maangtikas at MAJ Online."
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
            "name": "22k BIS 916 Gold Maangtikas Collection",
            "description": "BIS 916 hallmarked 22k gold maangtikas by Mahadeo Sah Amarnath Prasad Jewellers.",
            "url": "https://majonline.in/maangtikas",
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
          <Maangtikas />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
