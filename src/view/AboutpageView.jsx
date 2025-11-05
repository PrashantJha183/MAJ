import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load About component
const About = lazy(() => import("../components/about/About"));

const AboutpageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <About />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AboutpageView;
