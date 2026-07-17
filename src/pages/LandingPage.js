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

// Layout & Animation Configurations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  function handleMouseMove(e) {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    // Normalize values between -0.5 and 0.5
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="showcase-stage w-full max-w-md mx-auto aspect-square flex items-center justify-center relative persistent-perspective">
      <motion.div
        ref={showcaseRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformPerspective: 1000, 
          transformStyle: "preserve-3d" 
        }}
        className="architectural-glass-card w-full h-full relative rounded-3xl p-8 border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl transition-shadow duration-300 hover:shadow-emerald-500/10"
      >
        <div className="card-ambient-glow absolute inset-0 rounded-3xl opacity-40 mix-blend-color-dodge pointer-events-none" />
        <div className="card-blueprint-grid absolute inset-0 rounded-3xl opacity-10 pointer-events-none" />
        
        {/* Floating Badges & Architectural Elements using translateZ */}
        <div style={{ transform: "translateZ(30px)" }} className="absolute top-6 right-6 z-20">
          <span className="premium-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            KOMA PREMIUM
          </span>
        </div>

        <div style={{ transform: "translateZ(50px)" }} className="isometric-house-graphic relative w-full h-3/5 flex items-center justify-center z-10">
          <div className="iso-roof" />
          <div className="iso-wall-front">
            <div className="iso-window" />
            <div className="iso-window" />
          </div>
          <div className="iso-wall-side" />
          <Building2 className="absolute text-emerald-700/10 w-28 h-28 bottom-2 right-4 pointer-events-none md:w-36 md:h-36" />
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="card-caption-wrapper absolute bottom-8 left-8 right-8 z-20">
          <h4 className="kh-serif text-2xl font-bold text-gray-900 mb-1">The Glass Atrium</h4>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">Select Concept No. 14</p>
        </div>
      </motion.div>
      <div className="showcase-ground-shadow absolute -bottom-4 w-[85%] h-6 bg-black/10 blur-xl rounded-full pointer-events-none" />
    </div>
  );
}

function FeatureCard({ Icon, accent, title, copy }) {
  const cardRef = useRef(null);
  const accentStyle = ACCENT_STYLES[accent] || ACCENT_STYLES.gray;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth CSS-driven transforms offloading burden from state hooks
  const y = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="bento-card p-6 md:p-8 group relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300"
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
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, -30]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-slate-50/50 flex flex-col items-center justify-start overflow-x-hidden landing-container antialiased selection:bg-emerald-200">
      {/* Visual Ambient Underlays */}
      <div className="gradient-mesh-bg absolute inset-0 pointer-events-none z-0" />
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-[0.03] z-0" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Callout Meta Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col text-center lg:text-left items-center lg:items-start lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 bg-emerald-50/70 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-emerald-600 animate-[spin_8s_linear_infinite]" />
              <span className="text-emerald-800 font-bold text-xs tracking-widest uppercase">
                The Architecture of Living
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl kh-serif font-bold leading-[1.1] text-gray-900 tracking-tight max-w-2xl"
            >
              Find Your Perfect Space with <span className="kh-shimmer font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">KOMA.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Discover stunning rooms, curated apartments, and spatial engineering re-imagined for the global citizen.
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white text-center rounded-full font-bold transition-all shadow-md active:scale-95">
                Get Started
              </Link>
              <Link to="/rooms" className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-white text-gray-900 text-center rounded-full font-bold transition-all border border-gray-200/80 backdrop-blur-sm shadow-sm active:scale-95">
                Explore Properties
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Showcase - Placed on the Grid layout directly */}
          <div className="w-full lg:col-span-5 flex justify-center items-center px-4">
            <InteractiveShowcase />
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="relative z-10 w-full mt-12 mb-16 border-y border-gray-200/30 bg-white/10 backdrop-blur-md py-5 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap min-w-full gap-12">
          {[...STATS, ...STATS, ...STATS].map((s, i) => (
            <div className="marquee-item flex items-center justify-center text-lg font-bold text-gray-800 gap-2" key={i}>
              <span className="text-xl text-emerald-600">{s.n}</span>
              <span className="text-sm font-medium text-gray-500 tracking-wide">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="w-full max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 my-16">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl kh-serif font-bold mb-4 text-gray-900 tracking-tight">
            Why Choose <span className="text-emerald-600">KOMA?</span>
          </h2>
          <p className="text-gray-400 font-semibold text-base">
            Refined layout architectures engineered with absolute, uncompromised transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Call to Action Band Section */}
      <section className="w-full max-w-6xl relative z-10 px-4 sm:px-6 lg:px-8 mt-20 mb-24">
        <div className="cta-band relative overflow-hidden rounded-[2.5rem] px-6 py-16 md:px-12 md:py-20 text-center shadow-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-950">
          <div className="cta-blob b1 absolute -top-1/2 -left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl pointer-events-none" />
          <div className="cta-blob b2 absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl kh-serif font-bold text-white mb-6 tracking-tight leading-tight">
              Your next structural sanctuary is closer than you think.
            </h2>
            <p className="text-emerald-100/70 text-sm sm:text-base mb-10 max-w-xl font-medium leading-relaxed">
              Join families and nomads discovering highly optimized spaces engineered to dynamically sync with modern lifestyle frameworks.
            </p>
            <Link to="/signup" className="cta-btn-glow inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-base md:text-lg transition-all shadow-lg active:scale-98">
              Get Secured Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;