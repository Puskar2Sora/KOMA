import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Home } from "lucide-react";
import confetti from "canvas-confetti";

const FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Verified Listings",
    copy: "Every property and owner uses secure verification protocols ensuring absolute safety.",
  },
  {
    Icon: Home,
    title: "Smart Curation",
    copy: "No hidden fees, no messy lists. See only properties that match your specific lifestyle.",
  },
  {
    Icon: Zap,
    title: "Instant Booking",
    copy: "Connect directly with owners through our integrated messaging and secure properties.",
  },
];

// High-performance Spring physics
const mobileSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.8
};

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 } 
  }
};

const featureContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const featureItem = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18 } 
  }
};

// Continuous text loop settings for the mobile marquee banner
const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 22,
        ease: "linear",
      },
    },
  },
};

function LandingPage() {
  
  const handleCtaTap = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#10b981', '#34d399', '#059669', '#ffffff'],
      disableForReducedMotion: true
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-center items-center pb-16 overflow-x-hidden select-none relative">
      
      {/* NEW: Top Infinite Smooth Marquee Banner */}
    
      {/* Floating Abstract Ambient Blur Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[5%] w-40 h-40 bg-emerald-50/50 rounded-full filter blur-2xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 35, 0],
            x: [0, -25, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-[5%] w-56 h-56 bg-emerald-50/30 rounded-full filter blur-3xl"
        />
      </div>

      {/* Brand Logo Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={mobileSpring}
        className="mb-14 relative z-10"
      >
      </motion.div>

      {/* Hero Section */}
      <motion.main 
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center px-6 relative z-10"
      >
        {/* NEW: Bouncing Notification Capsule */}
        <motion.div 
          variants={heroItem}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/60 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-8 cursor-pointer shadow-sm"
        >
          <motion.span 
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} 
            transition={{ repeat: Infinity, duration: 1.8 }} 
            className="w-2 h-2 rounded-full bg-emerald-500" 
          />
          The New Standard of Living
        </motion.div>

        {/* Hero Title with Selective Floating Words */}
        <motion.h1 
          variants={heroItem} 
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12] mb-6"
        >
          Find Your Perfect Stay with{" "}
          <motion.span 
            className="text-emerald-600 inline-block"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            KOMA
          </motion.span>
        </motion.h1>

        <motion.p 
          variants={heroItem} 
          className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
        >
          Discover affordable rooms, cozy apartments, and luxury stays curated specifically for your lifestyle.
        </motion.p>

        {/* Buttons with Fluid Elastic Tap Responses */}
        <motion.div 
          variants={heroItem} 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-28 w-full max-w-md mx-auto px-4"
        >
          <motion.div 
            className="w-full sm:w-auto" 
            whileTap={{ scale: 0.93, rotate: -0.5 }} 
            whileHover={{ scale: 1.02 }}
            transition={mobileSpring}
          >
            <Link 
              to="/signup" 
              onClick={handleCtaTap}
              className="block w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl text-center shadow-lg shadow-emerald-200/60 active:bg-emerald-700 transition-colors"
            >
              Get Started Now
            </Link>
          </motion.div>
          
          <motion.div 
            className="w-full sm:w-auto" 
            whileTap={{ scale: 0.93, rotate: 0.5 }}
            whileHover={{ scale: 1.02 }} 
            transition={mobileSpring}
          >
            <Link 
              to="/rooms" 
              className="block w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl text-center border-2 border-gray-100 active:bg-gray-50 transition-colors"
            >
              Explore Properties
            </Link>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Features Grid with Micro-Scaling Items */}
      <section className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={featureContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-3 md:gap-6"
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              variants={featureItem}
              whileTap={{ scale: 0.96, y: 2 }}
              whileHover={{ 
                y: -6,
                borderColor: "#10b981", 
                boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.12)"
              }}
              transition={mobileSpring}
              className="p-6 sm:p-8 bg-gray-50/50 border-2 border-gray-50 rounded-2xl cursor-pointer group transition-colors duration-200"
            >
              {/* Icon Jiggle effect on hover */}
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200"
              >
                <feature.Icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {feature.copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
}

export default LandingPage;