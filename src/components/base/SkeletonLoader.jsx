// components/base/SkeletonLoader.jsx
import React from "react";

const SkeletonLoader = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 space-y-8">
    {/* Large Header */}
    <div className="h-10 w-3/4 rounded relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
    </div>
    <div className="h-6 w-1/2 rounded relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
    </div>

    {/* Hero Image / Banner */}
    <div className="h-72 w-full rounded relative overflow-hidden mt-6">
      <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
    </div>

    {/* Text paragraphs */}
    <div className="space-y-3 mt-6">
      <div className="h-4 w-full rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
      <div className="h-4 w-5/6 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
      <div className="h-4 w-2/3 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
    </div>

    {/* Grid / Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="h-40 w-full rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
        </div>
      ))}
    </div>

    {/* Buttons / CTA */}
    <div className="flex gap-4 mt-6">
      <div className="h-10 w-32 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
      <div className="h-10 w-24 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 rounded animate-shimmer" />
      </div>
    </div>

    {/* Shimmer Animation */}
    <style>{`
      .animate-shimmer {
        background: linear-gradient(90deg, rgba(229,229,229,1) 0%, rgba(200,200,200,0.6) 50%, rgba(229,229,229,1) 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </div>
);

export default SkeletonLoader;
