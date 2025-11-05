import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Rings = lazy(() => import("../components/products/rings/Rings"));

export default function RingspageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Rings />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
