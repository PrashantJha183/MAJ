import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/base/ErrorBoundary";
import SkeletonLoader from "../components/base/SkeletonLoader";

// Lazy load AdminLogin component
const AdminDashboard = lazy(() => import("../components/admin/AdminDashboard"));

export default function AdminDashboardpageView() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonLoader />}>
        <AdminDashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
