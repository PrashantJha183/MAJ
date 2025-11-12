import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load AdminLogin component
const AdminGoldHistory = lazy(() =>
  import("../components/admin/AdminGoldHistory")
);

export default function AdminGoldHistorypageView() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonLoader />}>
        <AdminGoldHistory />
      </Suspense>
    </ErrorBoundary>
  );
}
