import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Home } from "lucide-react";

function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-24 overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Hero Section */}
      <motion.header 
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-4xl relative z-10 px-4"
      >
        <motion.div variants={item} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
          <span className="text-purple-300 font-semibold text-sm">✨ The New Standard of Living</span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-8">
          Find Your Perfect Stay with <span className="neon-text-primary">KOMA</span>
        </motion.h1>
        
        <motion.p variants={item} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
          Discover affordable rooms, cozy apartments, and luxury stays customized to your lifestyle.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/signup" 
            className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:-translate-y-1"
          >
            Get Started Now
          </Link>
          <Link 
            to="/rooms" 
            className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/10 text-white rounded-2xl font-bold text-lg transition-all"
          >
            Explore Properties
          </Link>
        </motion.div>
      </motion.header>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mt-32 w-full max-w-6xl relative z-10 px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose <span className="neon-text-primary">KOMA?</span></h2>
          <p className="text-gray-400">Everything you need, nothing you don't.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl hover:neon-border transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Verified Listings</h3>
            <p className="text-gray-400 leading-relaxed">Every property and owner uses secure verification protocols ensuring absolute safety.</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:neon-border transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Home className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Curation</h3>
            <p className="text-gray-400 leading-relaxed">No hidden fees, no messy lists. See only properties that match your specific lifestyle.</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:neon-border transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Booking</h3>
            <p className="text-gray-400 leading-relaxed">Connect directly with owners through our integrated messaging and secure properties in minutes.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default LandingPage;