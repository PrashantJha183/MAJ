import React, { useEffect, useRef, memo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, Gem, Users } from "lucide-react";

import member1 from "../../assets/DSC_8896.JPG";
import member2 from "../../assets/DSC_8896.JPG";
import member3 from "../../assets/DSC_8896.JPG";
import member4 from "../../assets/DSC_8896.JPG";

// Stats data
const stats = [
  { label: "Years of Legacy", value: 100, suffix: "+", icon: Award },
  { label: "Unique Designs", value: 1500, suffix: "+", icon: Gem },
  { label: "Delighted Customers", value: 10000, suffix: "+", icon: Users },
  { label: "Certified Quality", value: 100, suffix: "%", icon: ShieldCheck },
];

// Board Members data
const boardMembers = [
  { name: "John Doe", role: "Founder & CEO", photo: member1 },
  { name: "Jane Smith", role: "Head Designer", photo: member2 },
  { name: "Robert Johnson", role: "Operations Head", photo: member3 },
  { name: "Emily Davis", role: "Marketing Lead", photo: member4 },
];

// StatItem Component
const StatItem = memo(({ stat, inView, delay }) => {
  const { label, value, suffix, icon: Icon } = stat;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / value), 1);

    const timer = setInterval(() => {
      start += Math.ceil(value / (duration / stepTime));
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0, scale: [0.9, 1.05, 1] } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-yellow-700 mb-3 shadow-lg hover:scale-110 transition-transform"
        aria-label={label}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-amber-800">
        {count}
        {suffix}
      </h3>
      <p className="text-sm md:text-base text-gray-600 mt-1">{label}</p>
    </motion.div>
  );
});

// BoardMember Card Component
const BoardMember = memo(({ member, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0, scale: [0.95, 1.05, 1] }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center text-center"
  >
    <div className="w-32 h-32 mb-3 overflow-hidden rounded-full border-4 border-amber-100 shadow-lg">
      <img
        src={member.photo}
        alt={member.name}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
      />
    </div>
    <h4 className="text-lg md:text-xl font-semibold text-amber-800">
      {member.name}
    </h4>
    <p className="text-gray-600 text-sm md:text-base">{member.role}</p>
  </motion.div>
));

const About = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white text-gray-800 py-16 md:py-24 overflow-hidden"
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
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} inView={isInView} delay={0.2 * i} />
          ))}
        </div>

        {/* Board of Members */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-yellow-700 font-semibold mb-8">
            Our Board of Members
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {boardMembers.map((member, i) => (
              <BoardMember key={i} member={member} delay={0.2 * i} />
            ))}
          </div>
        </motion.div>

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

export default About;
