import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { User, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import AdminBg from "../../assets/compressed/admin.png";
import Logo from "../../assets/compressed/MAJ_Logo_for_Web.png";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`;

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  // Minimal throttle setup
  const lastAttempt = useRef(0);
  const THROTTLE_DELAY = 500; // 0.5 second minimal throttle

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const now = Date.now();

      // Minimal throttle: prevent rapid repeated clicks
      if (now - lastAttempt.current < THROTTLE_DELAY) {
        setError("Please wait a moment before trying again.");
        return;
      }
      lastAttempt.current = now;

      const { username, password } = credentials;
      if (!username.trim() || !password.trim()) {
        setError("Username and password are required.");
        return;
      }

      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Login failed.");

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1000);
      } catch (err) {
        setError(err.message || "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [credentials]
  );

  return (
    <div className="relative flex items-center justify-center lg:justify-end new-font overflow-hidden responsive-min-height">
      {/* Background Image */}
      <div className="hidden lg:block absolute inset-0 bg-cover bg-center">
        <img
          src={AdminBg}
          alt="Admin Background"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            bgLoaded ? "blur-0 opacity-100" : "blur-2xl opacity-30"
          }`}
          onLoad={() => setBgLoaded(true)}
        />
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 300, // higher stiffness → faster
          damping: 20, // lower damping → more bounce
          duration: 0.5, // shorter duration
        }}
        className="relative z-10 w-[90%] sm:w-3/4 md:w-1/3 lg:w-[30%] xl:w-[25%] md:mt-24 bg-white border border-gray-200 shadow-lg rounded-2xl p-8 sm:p-10 md:p-16 lg:p-20 lg:mr-32"
      >
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Mahadeo Sah Amarnath Jewellers Logo"
            className="w-20 h-20 object-contain"
            loading="lazy"
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-semibold text-center maroon-color mb-6"
        >
          Admin Login
        </motion.h2>

        {error && (
          <div className="text-red-600 text-sm text-center mb-3 font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center mb-3 font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Username */}
          <div className="relative group">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 maroon-color" />
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 rounded-3xl border border-gray-300 text-sm focus:ring-2 focus:outline-none transition-all placeholder-gray-400"
              style={{ "--tw-ring-color": "#8b0000", borderColor: "#8b0000" }}
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 maroon-color" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-3xl border border-gray-300 text-sm focus:ring-2 focus:outline-none transition-all placeholder-gray-400"
              style={{ "--tw-ring-color": "#8b0000", borderColor: "#8b0000" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 maroon-color hover:opacity-80 transition"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-3xl text-white font-medium text-sm transition-all ${
              loading
                ? "maroon-background cursor-not-allowed"
                : "maroon-background"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2  rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Login
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          Authorized personnel only.
        </p>
      </motion.div>
    </div>
  );
}
