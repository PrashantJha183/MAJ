import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Naths = lazy(() => import("../components/products/naths/Naths"));

export default function MaangtikapageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Naths />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
