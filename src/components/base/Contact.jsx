import React, {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Phone as PhoneIcon, MessageCircle } from "lucide-react"; // For mobile bottom buttons

// Lazy load icons for memory efficiency
const Phone = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Phone }))
);
const Mail = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Mail }))
);
const MapPin = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.MapPin }))
);

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [debounceTimer, setDebounceTimer] = useState(null);

  const validateForm = useCallback(
    (triggerShake = true) => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Please enter your name.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
        newErrors.email = "Invalid email address.";
      if (!formData.subject.trim())
        newErrors.subject = "Please enter a subject.";
      if (!formData.message.trim())
        newErrors.message = "Message cannot be empty.";

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);

      if (triggerShake && Object.keys(newErrors).length > 0) {
        const shakeObj = {};
        Object.keys(newErrors).forEach((key) => (shakeObj[key] = Date.now()));
        setShake(shakeObj);
      }

      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        validateForm(false);
      }, 300)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
      setIsValid(false);
      setAttemptedSubmit(false);
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }} // changed from whileInView
      transition={{ duration: 0.8 }}
      className="bg-white shadow-lg rounded-2xl p-8 md:p-10 border border-amber-100"
      role="form"
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
        ].map((field) => (
          <motion.div
            key={field.name + shake[field.name]}
            variants={shakeVariants}
            animate={shake[field.name] ? "shake" : ""}
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {field.label}
            </label>
            <motion.input
              id={field.name}
              whileFocus={{ scale: 1.02 }}
              aria-invalid={!!errors[field.name]}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              className={`w-full p-3 rounded-md border transition-all duration-300 ${
                errors[field.name] && attemptedSubmit
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-600"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              required
              autoComplete="off"
            />
            <AnimatePresence>
              {attemptedSubmit && errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={14} /> {errors[field.name]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {["subject", "message"].map((field) => (
        <motion.div
          key={field + shake[field]}
          variants={shakeVariants}
          animate={shake[field] ? "shake" : ""}
          className="mt-6"
        >
          <label
            htmlFor={field}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {field === "subject" ? "Subject" : "Message"}
          </label>
          {field === "subject" ? (
            <motion.input
              id={field}
              name={field}
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={formData[field]}
              onChange={handleChange}
              placeholder="Enter subject"
              className={`w-full p-3 rounded-md border ${
                errors[field] && attemptedSubmit
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-600"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              required
              autoComplete="off"
            />
          ) : (
            <motion.textarea
              id={field}
              name={field}
              whileFocus={{ scale: 1.02 }}
              rows="5"
              value={formData[field]}
              onChange={handleChange}
              placeholder="Write your message..."
              className={`w-full min-h-[120px] p-3 rounded-md border resize-none ${
                errors[field] && attemptedSubmit
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-600"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              required
              autoComplete="off"
            />
          )}
          <AnimatePresence>
            {attemptedSubmit && errors[field] && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-red-500 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle size={14} /> {errors[field]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <div className="mt-8 text-center">
        <motion.button
          type="submit"
          whileHover={{ scale: isValid ? 1.05 : 1 }}
          whileTap={{ scale: isValid ? 0.95 : 1 }}
          disabled={!isValid}
          className={`px-8 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            isValid
              ? "bg-yellow-600 hover:bg-amber-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-600"
          }`}
        >
          {submitted ? "Message Sent" : "Send Message"}
        </motion.button>

        <AnimatePresence>
          {submitted && (
            <motion.p
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-green-600 font-medium mt-4"
            >
              Thank you! Your message has been sent successfully.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}

const Contact = memo(() => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="relative bg-white text-gray-800 py-20 md:py-28 new-font md:pt-40 overflow-hidden"
      id="contact"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif font-bold text-amber-800"
          >
            Contact <span className="text-yellow-600">Us</span>
          </motion.h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            We’d love to hear from you — reach out with your questions or
            feedback.
          </p>
        </header>

        <div className="grid md:grid-cols-2 md:gap-14 lg:gap-20 gap-10">
          <Suspense
            fallback={
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Call Us</h4>
                  <p className="text-gray-600">
                    +91 9973172805 / +91 7011913993
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Email</h4>
                  <p className="text-gray-600">majonline@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Visit Us</h4>
                  <p className="text-gray-600">
                    Gandhi Chowk, Rajnagar, Madhubani, Bihar - 846004
                  </p>
                </div>
              </div>
            </motion.div>
          </Suspense>

          <Suspense
            fallback={
              <div className="bg-white shadow-lg rounded-2xl p-8 border border-amber-100 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </div>

      {/* Mobile-only Bottom Call & WhatsApp Buttons */}
      {/* <div className="md:hidden fixed bottom-14 left-0 right-0 z-50 flex justify-around px-6 bg-gray-100 border-2 p-2">
        <a
          href="tel:+919973172805"
          className="flex items-center justify-center w-1/2 py-3 mr-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-amber-700 transition-colors"
        >
          <PhoneIcon size={20} className="mr-2" /> Call Us
        </a>
        <a
          href="https://wa.me/919973172805"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-1/2 py-3 ml-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle size={20} className="mr-2" /> WhatsApp
        </a>
      </div> */}
    </main>
  );
});

export default Contact;
