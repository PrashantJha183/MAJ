import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Mangalsutras = lazy(() =>
  import("../components/products/mangalsutras/Mangalsutra")
);

export default function MangalsutrapageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Mangalsutras />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
