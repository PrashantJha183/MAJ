import React, { Suspense, lazy, useEffect } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";
import { Helmet } from "react-helmet-async";

// Lazy load the Gold History admin component
const AdminGoldHistory = lazy(() =>
  import("../components/admin/AdminGoldHistory")
);

// Preload for improved speed
AdminGoldHistory.preload = () => import("../components/admin/AdminGoldHistory");

export default function AdminGoldHistorypageView() {
  // Preload after mount for instant switching
  useEffect(() => {
    setTimeout(() => {
      AdminGoldHistory.preload();
    }, 80);
  }, []);

  return (
    <>
      {/* SEO + Indexing Meta */}
      <Helmet>
        <title>
          Admin Gold Price History – Mahdeo Sah Amarnath Prasad Jewellers
        </title>

        <meta
          name="description"
          content="Admin panel for viewing and managing historical gold price entries for Mahdeo Sah Amarnath Prasad Jewellers. Secure management interface."
        />

        <meta
          name="keywords"
          content="gold price history admin, jewellery admin panel, gold rate management, Mahdeo Sah Amarnath Prasad Jewellers gold history"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://mahdeosahamarnathprasadjewellers.com/admin/gold-history"
        />

        {/* Social Preview */}
        <meta
          property="og:title"
          content="Admin Gold Price History – Mahdeo Sah Amarnath Prasad Jewellers"
        />
        <meta
          property="og:description"
          content="Manage and view detailed gold price history from the secure admin dashboard."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mahdeosahamarnathprasadjewellers.com/admin/gold-history"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* STRUCTURED DATA — Google Rich Results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Admin Gold Price History – Mahdeo Sah Amarnath Prasad Jewellers",
            description:
              "Admin interface for managing and reviewing gold price history records.",
            url: "https://mahdeosahamarnathprasadjewellers.com/admin/gold-history",
            publisher: {
              "@type": "JewelryStore",
              name: "Mahdeo Sah Amarnath Prasad Jewellers",
              url: "https://mahdeosahamarnathprasadjewellers.com",
              sameAs: [
                "https://www.instagram.com/maj_rajnagar",
                "https://www.facebook.com/share/1adnrV18Fy/",
              ],
            },
          })}
        </script>
      </Helmet>

      {/* Main Component */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <AdminGoldHistory />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
