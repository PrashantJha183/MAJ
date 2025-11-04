import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load homepage components
const Hero = lazy(() => import("../components/homepage/Hero"));
const Gift = lazy(() => import("../components/homepage/Gift"));
const Band = lazy(() => import("../components/homepage/Band"));
const BestSellers = lazy(() => import("../components/homepage/BestSellers"));
// const Reel = lazy(() => import("../components/homepage/Reel"));
// const NewArrivals = lazy(() => import("../components/homepage/NewArrivals"));

const HomepageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Hero />
        </Suspense>
      </ErrorBoundary>

      {/* 
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Reel />
        </Suspense>
      </ErrorBoundary> 
      */}

      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <BestSellers />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Gift />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Band />
        </Suspense>
      </ErrorBoundary>

      {/* 
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <NewArrivals />
        </Suspense>
      </ErrorBoundary> 
      */}
    </>
  );
};

export default HomepageView;
