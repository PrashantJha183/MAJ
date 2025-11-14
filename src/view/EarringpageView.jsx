import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Earrings = lazy(() => import("../components/products/earrings/Earring"));

export default function EarringpageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Earrings />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
