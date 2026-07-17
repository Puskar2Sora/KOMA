import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Zap, ShieldCheck, Home, ArrowRight, Compass, Sparkles, Building2 } from "lucide-react";
import "../styles/landingPage.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

const FEATURES = [
  {
    Icon: ShieldCheck,
    accent: "emerald",
    title: "Verified Listings",
    copy: "Every single property undergoes decentralized validation protocols ensuring absolute physical safety.",
  },
  {
    Icon: Home,
    accent: "gray",
    title: "Smart Curation",
    copy: "Predictive lifestyle matching engines parse architectural styles to match your day-to-day rhythm.",
  },
  {
    Icon: Zap,
    accent: "orange",
    title: "Instant Booking",
    copy: "Bypass brokers entirely with smart-contract tenancy locks finalized in under sixty seconds.",
  },
];

const ACCENT_STYLES = {
  emerald: {
    bg: "bg-emerald-50/50 group-hover:bg-emerald-600 border-emerald-100/50",
    icon: "text-emerald-600 group-hover:text-white",
  },
  gray: {
    bg: "bg-gray-50/50 group-hover:bg-gray-900 border-gray-100/50",
    icon: "text-gray-700 group-hover:text-white",
  },
  orange: {
    bg: "bg-orange-50/50 group-hover:bg-orange-500 border-orange-100/50",
    icon: "text-orange-500 group-hover:text-white",
  },
};

const STATS = [
  { n: "12,400+", l: "Verified Stays" },
  { n: "98%", l: "Match Satisfaction" },
  { n: "40+", l: "Cities Covered" },
  { n: "4.9★", l: "Average Rating" },
  { n: "24/7", l: "Owner Support" },
];

function InteractiveShowcase() {
  const showcaseRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="showcase-stage">
      <motion.div
        ref={showcaseRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
        className="architectural-glass-card"
      >
        <div className="card-ambient-glow" />
        <div className="card-blueprint-grid" />
        
        <div style={{ transform: "translateZ(40px)" }} className="absolute top-6 right-6">
          <span className="premium-badge">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            KOMA PREMIUM
          </span>
        </div>

        <div style={{ transform: "translateZ(60px)" }} className="isometric-house-graphic">
          <div className="iso-roof" />
          <div className="iso-wall-front">
            <div className="iso-window" />
            <div className="iso-window" />
          </div>
          <div className="iso-wall-side" />
          <Building2 className="absolute text-emerald-700/20 w-32 h-32 bottom-2 right-4 pointer-events-none" />
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="card-caption-wrapper">
          <h4 className="kh-serif text-2xl font-bold text-gray-900 mb-1">The Glass Atrium</h4>
          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">Select Concept No. 14</p>
        </div>
      </motion.div>
      <div className="showcase-ground-shadow" />
    </div>
  );
}

function FeatureCard({ Icon, accent, title, copy, index }) {
  const cardRef = useRef(null);
  const accentStyle = ACCENT_STYLES[accent];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const entranceY = useTransform(scrollYProgress, [0, 0.35], [50, 0]);
  const entranceOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: entranceY, opacity: entranceOpacity }}
      className="bento-card p-8 group relative overflow-hidden"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-all duration-300 ${accentStyle.bg}`}>
        <Icon className={`w-6 h-6 transition-colors duration-300 ${accentStyle.icon}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight kh-serif">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed font-medium text-sm">
        {copy}
      </p>
    </motion.div>
  );
}

function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <div className="relative flex flex-col items-center justify-center pt-12 pb-24 overflow-x-hidden landing-container">
      <div className="gradient-mesh-bg" />
      <div className="grain-overlay" />

      <div className="relative z-10 w-full max-w-6xl px-4 grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <motion.header
          ref={heroRef}
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center lg:text-left max-w-2xl"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-emerald-200/60 bg-emerald-50/60 backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
            <span className="text-emerald-800 font-bold text-xs tracking-widest uppercase">
              The Architecture of Living
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl kh-serif font-bold leading-[1.05] mb-6 text-gray-900 tracking-tight"
          >
            Find Your Perfect Space with <span className="kh-shimmer font-black">KOMA.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Discover stunning rooms, curated apartments, and spatial engineering re-imagined for the global citizen.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full font-bold transition-all shadow-md">
              Get Started
            </Link>
            <Link to="/rooms" className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-white text-gray-900 rounded-full font-bold transition-all border border-gray-200/80 backdrop-blur-sm shadow-sm">
              Explore Properties
            </Link>
          </motion.div>
        </motion.header>

        <div className="hidden lg:block">
          <InteractiveShowcase />
        </div>
      </div>

      <div className="lg:hidden relative z-10 mt-6 w-full max-w-sm">
        <InteractiveShowcase />
      </div>

      <div className="relative z-10 mt-12 mb-20 marquee-wrap border-y border-gray-200/30 bg-white/10 backdrop-blur-sm py-4">
        <div className="marquee-track">
          {[...STATS, ...STATS].map((s, i) => (
            <div className="marquee-item" key={i}>
              {s.n} <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-20 w-full max-w-6xl relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl kh-serif font-bold mb-4 text-gray-900 tracking-tight">
            Why Choose <span className="text-emerald-600">KOMA?</span>
          </h2>
          <p className="text-gray-400 font-semibold text-base">
            Refined layout layouts engineered with total transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} index={i} {...f} />
          ))}
        </div>
      </section>

      <section className="mt-28 w-full max-w-6xl relative z-10 px-4">
        <div className="cta-band px-8 py-16 text-center shadow-xl">
          <div className="cta-blob b1" />
          <div className="cta-blob b2" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl kh-serif font-bold text-white mb-4 tracking-tight">
              Your next structural sanctuary is closer than you think.
            </h2>
            <p className="text-emerald-100/70 text-base mb-8 max-w-xl mx-auto font-medium">
              Join families and nomads finding spaces designed to sync with lifestyle frameworks.
            </p>
            <Link to="/signup" className="cta-btn-glow inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-lg transition-all shadow-md">
              Get Secured Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;