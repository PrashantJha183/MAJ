import React from "react";
import Contact from "../components/contact/Contact";
import ErrorBoundary from "../components/base/ErrorBoundary";

export default function ContactpageView() {
  return (
    <>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    </>
  );
}
