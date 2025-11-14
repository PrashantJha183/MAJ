import React, { Suspense, lazy, useEffect } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";
import { Helmet } from "react-helmet";

// Lazy load Admin Dashboard
const AdminDashboard = lazy(() => import("../components/admin/AdminDashboard"));

// Preload for speed
AdminDashboard.preload = () => import("../components/admin/AdminDashboard");

export default function AdminDashboardpageView() {
  // Preload component after mount
  useEffect(() => {
    setTimeout(() => {
      AdminDashboard.preload();
    }, 80);
  }, []);

  return (
    <>
      {/* SEO + Meta Tags */}
      <Helmet>
        <title>Admin Dashboard – Mahdeo Sah Amarnath Prasad Jewellers</title>

        <meta
          name="description"
          content="Admin Dashboard for managing jewellery inventory, orders, gold prices, and homepage content of Mahdeo Sah Amarnath Prasad Jewellers."
        />

        <meta
          name="keywords"
          content="Mahdeo Sah Amarnath Prasad Jewellers admin panel, jewellery admin dashboard, gold price management, inventory panel"
        />

        <link
          rel="canonical"
          href="https://mahdeosahamarnathprasadjewellers.com/admin"
        />

        {/* OpenGraph */}
        <meta
          property="og:title"
          content="Admin Dashboard – Mahdeo Sah Amarnath Prasad Jewellers"
        />
        <meta
          property="og:description"
          content="Secure admin dashboard for inventory, orders & gold price management."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mahdeosahamarnathprasadjewellers.com/admin"
        />

        {/* Indexing for GSC */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Admin Dashboard – Mahdeo Sah Amarnath Prasad Jewellers",
            description:
              "Admin panel for managing inventory, orders, gold price data, and website content.",
            url: "https://mahdeosahamarnathprasadjewellers.com/admin",
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
          <AdminDashboard />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
