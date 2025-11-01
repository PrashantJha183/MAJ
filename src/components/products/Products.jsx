import React from "react";
import { FiTool } from "react-icons/fi"; // Tool icon

export default function Products() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 pt-12 pb-8 md:pt-48 md:pb-20">
      <FiTool className="text-6xl text-yellow-400 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Page Under Development
      </h1>
      <p className="text-gray-600 text-base md:text-lg">
        We're working hard to bring you this section soon. Stay tuned!
      </p>
    </div>
  );
}
