import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Trash2,
  CheckCircle2,
  Clock,
  CalendarDays,
  PenSquare,
  X,
  History,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { FaCoins } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminDashboard() {
  const [latestGold, setLatestGold] = useState(null);
  const [price, setPrice] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changing, setChanging] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
      const date = istTime.toISOString().split("T")[0];
      const time = istTime.toISOString().split("T")[1].split(".")[0];
      setCurrentDate(date);
      setCurrentTime(time);
    };
    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestGold = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/gold/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        toast.error("Session expired! Please login again.");
        localStorage.removeItem("adminToken");
        return navigate("/login");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setLatestGold(data);
    } catch (err) {
      toast.error(err.message || "Failed to load latest gold price.");
    }
  };

  useEffect(() => {
    fetchLatestGold();
  }, []);

  const handleAdd = async () => {
    if (!price.trim()) return toast.error("Enter a valid gold price.");
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/gold`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priceInINR: parseFloat(price) }),
      });

      if (res.status === 401) {
        toast.error("Unauthorized! Please login again.");
        localStorage.removeItem("adminToken");
        return navigate("/login");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Gold price added successfully!");
      setPrice("");
      fetchLatestGold();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmUpdate = async () => {
    try {
      setUpdating(true);
      const res = await fetch(`${BACKEND_URL}/api/gold/${latestGold._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priceInINR: parseFloat(newPrice) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Gold price updated successfully!");
      setEditMode(false);
      setModalType(null);
      fetchLatestGold();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/gold/${latestGold._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Gold price deleted successfully.");
      setModalType(null);
      fetchLatestGold();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setChanging(true);
      const res = await fetch(`${BACKEND_URL}/api/admin/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error(
          "Server returned an unexpected response. Please try again later."
        );
      }

      if (!res.ok) {
        const message =
          data?.message ||
          "Could not change password. Please check your current password and try again.";
        throw new Error(message);
      }

      toast.success("Password changed successfully!");
      setShowChangePassword(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      const errorMessage =
        err.message.includes("Unexpected token") ||
        err.message.includes("<!DOCTYPE") ||
        err.message.toLowerCase().includes("json")
          ? "Something went wrong on the server. Please try again in a moment."
          : err.message || "Failed to change password. Please try again.";

      toast.error(errorMessage);
    } finally {
      setChanging(false);
    }
  };

  return (
    <div classname="bg-gray-50 ">
      <div className="p-6 md:p-10 mt-4 md:mt-20 admin-height relative new-font">
        <Toaster position="top-right" />

        <div className="flex flex-wrap justify-around items-center mb-8 gap-4 relative">
          <h1 className="text-lg md:text-3xl font-semibold maroon-color flex items-center gap-2">
            <DollarSign className="w-6 h-6 maroon-color" />
            <span className="sm:inline">Gold Price Dashboard</span>
          </h1>

          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              <div className="flex items-center gap-2 sm:gap-2 mb-4 md:mb-0">
                <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 maroon-color shrink-0" />
                <span className="truncate">{currentDate}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 maroon-color shrink-0" />
                <span
                  style={{
                    display: "inline-block",
                    width: "65px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentTime}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
              <button
                onClick={() => navigate("/admin/gold-history")}
                className="flex items-center justify-center gap-2 maroon-background text-white px-3 py-2 rounded-lg hover:opacity-90"
              >
                <History className="w-5 h-5" />
                <span className="hidden md:inline">History</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 border border-maroon maroon-color px-3 py-2 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>

              <button
                onClick={() => setShowChangePassword(true)}
                className="flex items-center justify-center gap-2 border border-maroon maroon-background text-white px-3 py-2 rounded-lg transition"
              >
                <KeyRound className="w-5 h-5" />
                <span className="hidden md:inline">Change Password</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Gold Price (INR)"
            className="border border-maroon rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b0000] w-40 sm:w-60"
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="maroon-background text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

        <motion.div
          className="relative bg-white rounded-lg shadow p-6 max-w-7xl mx-auto lg:mt-10 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center text-lg md:text-2xl font-semibold maroon-color pb-8">
            Latest Gold Price
          </p>

          {latestGold ? (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-40 gap-8 ">
              <div className="flex items-center justify-center gap-4 flex-shrink-0">
                <FaCoins className="w-10 h-10 md:w-16 md:h-16 text-yellow-500" />
                {!editMode ? (
                  <p className="text-2xl md:text-3xl font-bold maroon-color">
                    ₹{latestGold.priceInINR} / 10g Gold
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Enter new price"
                      className="border border-maroon rounded-lg px-3 py-1 w-40 focus:outline-none"
                    />
                    <button
                      onClick={() => setModalType("update")}
                      className="maroon-background text-white px-3 py-1 rounded-lg flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Confirm</span>
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="text-gray-500 flex items-center gap-1"
                    >
                      <X className="w-5 h-5" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {!editMode && (
                <div className="flex flex-col items-center lg:items-end gap-3 text-gray-700 text-sm sm:text-base md:text-lg">
                  <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-maroon" />
                      <span>
                        {latestGold.date.split("T")[1]?.split(".")[0]}
                      </span>
                    </span>

                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-maroon" />
                      <span>{latestGold.date.split("T")[0]}</span>
                    </span>
                  </div>

                  <div className="flex justify-center lg:justify-end gap-4 mt-1">
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setNewPrice(latestGold.priceInINR);
                      }}
                      className="maroon-color flex items-center gap-2 text-base sm:text-lg transition"
                    >
                      <PenSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setModalType("delete")}
                      className="text-red-600 hover:text-red-800 flex items-center gap-2 text-base sm:text-lg transition"
                    >
                      <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No latest gold price found.</p>
          )}
        </motion.div>

        {showChangePassword && (
          <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 p-6 md:m-0 bg-black-40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 p-6 sm:p-8 text-center relative transform transition-all duration-300 scale-100 animate-fadeInUp">
              <button
                onClick={() => setShowChangePassword(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-maroon transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-lg sm:text-xl font-semibold mb-4 maroon-color">
                Change Password
              </h3>

              <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-maroon pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="absolute right-3 top-1/4 -translate-y-1/4 text-gray-500 hover:text-maroon"
                  >
                    {showOldPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-maroon pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/3 -translate-y-1/3 text-gray-500 hover:text-maroon"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex justify-center gap-4 mt-3">
                  <button
                    type="submit"
                    disabled={changing}
                    className="maroon-background text-white px-4 py-2 rounded-lg "
                  >
                    {changing ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChangePassword(false)}
                    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {modalType && (
          <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 p-6 md:m-0">
            <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 p-6 sm:p-8 text-center relative transform transition-all duration-300 scale-100 animate-fadeInUp">
              <button
                onClick={() => setModalType(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-maroon transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 maroon-color">
                {modalType === "update" ? "Confirm Update" : "Confirm Deletion"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                {modalType === "update"
                  ? `Do you want to update the gold price to ₹${newPrice}?`
                  : "Are you sure you want to delete this entry?"}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    modalType === "update" ? confirmUpdate() : confirmDelete();
                  }}
                  className="maroon-background text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  OK
                </button>
                <button
                  onClick={() => setModalType(null)}
                  className="border border-gray-300 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
