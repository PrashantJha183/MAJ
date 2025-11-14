import React, { useEffect, useRef, memo, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";

// Lazy-load icons (lighter memory footprint)
const AwardIcon = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Award }))
);
const GemIcon = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Gem }))
);
const UsersIcon = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Users }))
);
const ShieldCheckIcon = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.ShieldCheck }))
);

// Images frozen to avoid reallocation
import member1 from "../../assets/DSC_8896.JPG";
import member2 from "../../assets/DSC_8896.JPG";
import member3 from "../../assets/DSC_8896.JPG";
import member4 from "../../assets/DSC_8896.JPG";

Object.freeze(member1);
Object.freeze(member2);
Object.freeze(member3);
Object.freeze(member4);

// Memoized constant stats
const statsData = Object.freeze([
  { label: "Years of Legacy", value: 100, suffix: "+", icon: AwardIcon },
  { label: "Unique Designs", value: 1500, suffix: "+", icon: GemIcon },
  { label: "Delighted Customers", value: 10000, suffix: "+", icon: UsersIcon },
  {
    label: "Certified Quality",
    value: 100,
    suffix: "%",
    icon: ShieldCheckIcon,
  },
]);

// Counter Component -------------------------------------------------
const StatItem = memo(({ stat, inView, delay }) => {
  const { label, value, suffix, icon: Icon } = stat;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let start = 0;
    let startTime = null;
    const duration = 1800; // lighter than interval → smoother + low CPU

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0, scale: [0.9, 1.05, 1] } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center new-font"
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700 mb-3 shadow-lg hover:scale-110 transition-transform"
        aria-label={label}
      >
        <React.Suspense fallback={<div className="w-8 h-8" />}>
          <Icon className="w-8 h-8" />
        </React.Suspense>
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-amber-800">
        {count}
        {suffix}
      </h3>
      <p className="text-sm md:text-base text-gray-600 mt-1">{label}</p>
    </motion.div>
  );
});

// About Component ---------------------------------------------------
const About = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white text-gray-800 py-16 md:py-24 overflow-hidden new-font"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/30 to-white pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-amber-800 font-bold pt-0 md:pt-8">
            About <span className="text-yellow-700">Us</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Since <strong>1911</strong>, we’ve been crafting timeless jewelry
            that celebrates heritage, trust, and craftsmanship — creating
            designs that define elegance for generations.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-20">
          {statsData.map((stat, i) => (
            <StatItem key={i} stat={stat} inView={isInView} delay={0.2 * i} />
          ))}
        </div>

        {/* Message Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-yellow-700 font-semibold mb-4">
            “Heritage, Trust & Certified Craftsmanship”
          </h3>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            With over a century of excellence, we continue to bring the best
            deals, certified quality, and exquisite artistry that reflect your
            individuality and grace. Our passion for jewelry is driven by the
            trust of <strong>10,000+ satisfied customers</strong> and the legacy
            we uphold every day.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

// ---------------------------------------
// SEO EXPORT (use in App SEO layout)
// ---------------------------------------
export const AboutSEO = {
  title: "About Us | MAJ Jewellers - Since 1911",
  description:
    "Discover the legacy of MAJ Jewellers since 1911 — master craftsmanship, certified gold, trusted quality, and over 10,000+ happy customers.",
  keywords:
    "MAJ Jewellers, Gold Jewellery, About MAJ, Jewellery since 1911, Certified Gold, Indian Jewellery",
  canonical: "/about",
};

export default About;
