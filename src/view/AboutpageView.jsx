// AboutpageView.jsx
import React, { Suspense, lazy, useEffect } from "react";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load About component (kept for performance)
const About = lazy(() => import("../components/about/About"));

const AboutpageView = () => {
  // Preload About chunk after mount (reduces load delay)
  useEffect(() => {
    setTimeout(() => {
      import("../components/about/About");
    }, 50);
  }, []);

  return (
    <>
      {/* SEO + OpenGraph + Twitter */}
      <Helmet>
        <title>
          About Us | Mahadeo Sah Amarnath Prasad Jewellers (MAJ Online)
        </title>

        <meta
          name="description"
          content="Learn about Mahadeo Sah Amarnath Prasad Jewellers (MAJ Online). Trusted jewellers since 1911 offering gold, silver, and diamond jewellery with premium craftsmanship."
        />
        <meta
          name="keywords"
          content="Mahadeo Sah Amarnath Prasad Jewellers About, MAJ Online, MAJ Rajnagar, Jewellery Store Bihar, Trusted Jewellers India, Gold Shop Madhubani"
        />

        <link rel="canonical" href="https://majonline.in/about" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Mahadeo Sah Amarnath Prasad Jewellers"
        />
        <meta
          property="og:description"
          content="Premium jewellers since 1911. Know our heritage, values, craftsmanship and commitment to purity."
        />
        <meta property="og:url" content="https://majonline.in/about" />
        <meta property="og:image" content="https://majonline.in/logo.jpg" />
        <meta property="og:site_name" content="MAJ Online" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About MAJ | Trusted Jewellers Since 1911"
        />
        <meta
          name="twitter:description"
          content="Discover our heritage, excellence and BIS-certified jewellery."
        />
        <meta name="twitter:image" content="https://majonline.in/logo.jpg" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Mahadeo Sah Amarnath Prasad Jewellers",
              "description": "Know the heritage, tradition and craftsmanship of MAJ Online - Trusted jewellers since 1911.",
              "url": "https://majonline.in/about",
              "publisher": {
                "@type": "JewelryStore",
                "name": "Mahadeo Sah Amarnath Prasad Jewellers",
                "sameAs": [
                  "https://www.instagram.com/maj_rajnagar",
                  "https://www.facebook.com/share/1adnrV18Fy/"
                ],
                "image": "https://majonline.in/logo.jpg"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Render ABOUT Section */}
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader priority="high" />}>
          <About />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AboutpageView;
