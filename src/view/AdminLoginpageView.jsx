import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load AdminLogin component
const AdminLogin = lazy(() => import("../components/admin/AdminLogin"));

export default function AdminLoginpageView() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonLoader />}>
        <AdminLogin />
      </Suspense>
    </ErrorBoundary>
  );
}
