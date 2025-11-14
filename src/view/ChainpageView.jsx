import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load the Rings component
const Chains = lazy(() => import("../components/products/chains/Chain"));

export default function ChainpageView() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Chains />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
