import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminGoldHistory() {
  const [goldData, setGoldData] = useState([]);
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

  const formatDate = (dateStr) => dateStr.split("T")[0];
  const formatTime = (dateStr) => dateStr.split("T")[1]?.split(".")[0];

  return (
    <div className="p-4 md:p-10 mt-4 md:mt-20 bg-gray-50 min-h-screen new-font">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-row flex-wrap justify-between items-center mb-6 md:mb-8 gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-xl md:text-3xl font-semibold maroon-color flex items-center gap-2">
          <History className="w-5 h-5 sm:w-6 sm:h-6 text-maroon" />
          Gold Price History
        </h1>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="maroon-background text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:opacity-90 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline-flex items-center gap-1 sm:gap-2">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back to Dashboard
          </span>
        </button>
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
            {goldData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No gold price history available.
                </td>
              </tr>
            ) : (
              goldData.map((item, i) => (
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

                  {/* Mobile: Date + Time stacked */}
                  <td className="px-4 py-3 text-sm text-gray-600 flex flex-col sm:hidden gap-2">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(item.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(item.date)}
                    </span>
                  </td>

                  {/* Tablet/Desktop: Separate columns */}
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
