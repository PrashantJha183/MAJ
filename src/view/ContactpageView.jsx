import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load Contact component
const Contact = lazy(() => import("../components/contact/Contact"));

export default function ContactpageView() {
  return (
    <>
      {/* --- SEO Metadata for Contact Page --- */}
      <Helmet>
        <title>
          Contact Us – Mahadeo Sah Amarnath Prasad Jewellers | MAJ Online
        </title>

        <meta
          name="description"
          content="Get in touch with Mahadeo Sah Amarnath Prasad Jewellers. Reach out for inquiries about gold jewellery, BIS-certified products, orders, and customer support."
        />

        <meta
          name="keywords"
          content="contact maj online, contact jewellers, MAJ contact, gold jewellery support, MAJ customer service"
        />

        <link rel="canonical" href="https://majonline.in/contact" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us – MAJ Online" />
        <meta
          property="og:description"
          content="Reach out to Mahadeo Sah Amarnath Prasad Jewellers for support or enquiries."
        />
        <meta property="og:url" content="https://majonline.in/contact" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us – MAJ Online" />
        <meta
          name="twitter:description"
          content="Get customer support and jewellery enquiry assistance from MAJ Online."
        />
        <meta name="twitter:image" content="https://majonline.in/logo.jpg" />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact MAJ Online",
            "url": "https://majonline.in/contact",
            "description": "Contact page for Mahadeo Sah Amarnath Prasad Jewellers (MAJ Online).",
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
          <Contact />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
