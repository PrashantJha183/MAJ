import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

const AdminLogin = lazy(() => import("../components/admin/AdminLogin"));

export default function AdminLoginpageView() {
  return (
    <>
      {/* ---------------- SEO HEAD TAGS ---------------- */}
      <Helmet>
        <title>Admin Login – Mahadeo Sah Amarnath Prasad Jewellers</title>

        <meta
          name="description"
          content="Secure admin login panel for Mahadeo Sah Amarnath Prasad Jewellers. Access the dashboard to manage jewellery collections, gold price updates, and product records."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />

        {/* Canonical */}
        <link rel="canonical" href="https://majonline.in/login" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Admin Login – Mahadeo Sah Amarnath Prasad Jewellers"
        />
        <meta
          property="og:description"
          content="Secure admin login panel for MAJ Online."
        />
        <meta property="og:url" content="https://majonline.in/login" />
        <meta property="og:site_name" content="MAJ Online" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta
          property="og:image:alt"
          content="MAJ Online Jewellery Store Logo"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Admin Login – Mahadeo Sah Amarnath Prasad Jewellers"
        />
        <meta
          name="twitter:description"
          content="Secure admin login access for MAJ Online backend."
        />
        <meta name="twitter:image" content="https://majonline.in/logo.jpg" />

        {/* JSON-LD STRUCTURED DATA (NO JSX ERROR) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Admin Login – Mahadeo Sah Amarnath Prasad Jewellers",
              url: "https://majonline.in/login",
              description:
                "Secure login panel for administrators of Mahadeo Sah Amarnath Prasad Jewellers.",
              publisher: {
                "@type": "JewelryStore",
                name: "Mahadeo Sah Amarnath Prasad Jewellers",
                url: "https://majonline.in",
                sameAs: [
                  "https://www.instagram.com/maj_rajnagar",
                  "https://www.facebook.com/share/1adnrV18Fy/",
                ],
              },
            }),
          }}
        />
      </Helmet>

      {/* ---------------- PAGE CONTENT ---------------- */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <AdminLogin />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
