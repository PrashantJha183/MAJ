import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Necklaces = lazy(() =>
  import("../components/products/necklaces/Necklace")
);

export default function NecklacepageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Necklaces />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
