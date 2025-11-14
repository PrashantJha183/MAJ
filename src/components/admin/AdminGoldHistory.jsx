import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, CalendarDays, Clock, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminGoldHistory() {
  const [goldData, setGoldData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchGoldData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/gold`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGoldData(data);
    } catch (err) {
      toast.error(err.message || "Failed to load history.");
    }
  };

  useEffect(() => {
    fetchGoldData();
  }, []);

  // Search filter (date or price)
  const filteredData = goldData.filter((item) => {
    const date = item.date.split("T")[0];
    const time = item.date.split("T")[1]?.split(".")[0];
    const price = String(item.priceInINR);

    return (
      date.includes(search) || time.includes(search) || price.includes(search)
    );
  });

  const formatDate = (dateStr) => dateStr.split("T")[0];
  const formatTime = (dateStr) => dateStr.split("T")[1]?.split(".")[0];

  return (
    <div className="p-4 md:p-10 mt-4 md:mt-20 bg-gray-50 min-h-screen new-font">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        {/* Title + Mobile Back Button (side by side on mobile) */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-lg sm:text-xl md:text-3xl font-semibold maroon-color flex items-center gap-2">
            <History className="w-5 h-5 sm:w-6 sm:h-6 text-maroon" />
            Gold Price History
          </h1>

          {/* Mobile Back Button (icon only) */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="md:hidden maroon-background text-white px-3 py-2 rounded-lg hover:opacity-90 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Search + Back (side by side) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search bar */}
          <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200 w-72">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by price or date..."
              className="ml-2 w-full outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Desktop Back Button */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="maroon-background text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 text-base"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </button>
        </div>

        {/* Mobile Search (below title) */}
        <div className="md:hidden w-full">
          <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200 w-full mt-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search price or date..."
              className="ml-2 w-full outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white rounded-lg shadow overflow-hidden">
          <thead className="maroon-background text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Price (₹)</th>
              <th className="px-4 py-3 text-left md:hidden">Date & Time</th>
              <th className="hidden md:table-cell px-4 py-3 text-left">Date</th>
              <th className="hidden md:table-cell px-4 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No matching results.
                </td>
              </tr>
            ) : (
              filteredData.map((item, i) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{i + 1}</td>

                  <td className="px-4 py-3 font-medium text-maroon">
                    ₹{item.priceInINR}
                  </td>

                  {/* Mobile: Date + Time */}
                  <td className="px-4 py-3 text-sm text-gray-600 flex flex-col md:hidden gap-1">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(item.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(item.date)}
                    </span>
                  </td>

                  {/* Desktop */}
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(item.date)}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(item.date)}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
