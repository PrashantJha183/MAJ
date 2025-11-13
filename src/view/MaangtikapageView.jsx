import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Maangtikas = lazy(() =>
  import("../components/products/mangtikas/Maangtika")
);

export default function MaangtikapageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Maangtikas />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
