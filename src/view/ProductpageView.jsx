import React from "react";
import Products from "../components/products/Products";
import ErrorBoundary from "../components/base/ErrorBoundary";

export default function ProductpageView() {
  return (
    <>
      <ErrorBoundary>
        <Products />
      </ErrorBoundary>
    </>
  );
}
