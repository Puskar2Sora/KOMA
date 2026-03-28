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
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden bg-gray-50/30">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] pointer-events-none" />

      {/* Hero Section */}
      <motion.header 
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-4xl relative z-10 px-4"
      >
        <motion.div variants={item} className="inline-block mb-8 px-5 py-2 rounded-full border border-blue-100 bg-blue-50/50 backdrop-blur-sm">
          <span className="text-blue-700 font-bold text-sm tracking-wide uppercase">✨ The New Standard of Living</span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl elegant-text-primary leading-[1.1] mb-8">
          Find Your Perfect Stay with <span className="text-blue-600">KOMA.</span>
        </motion.h1>
        
        <motion.p variants={item} className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Discover affordable rooms, cozy apartments, and luxury stays curated specifically tailored for your lifestyle.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/signup" 
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full font-bold text-lg transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            Get Started Now
          </Link>
          <Link 
            to="/rooms" 
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-bold text-lg transition-all border border-gray-200 shadow-sm"
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
          <h2 className="text-3xl md:text-4xl elegant-text-primary mb-4">Why Choose <span className="text-blue-600">KOMA?</span></h2>
          <p className="text-gray-500 font-medium text-lg">Everything you need, nothing you don't.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bento-card p-10 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 transition-colors duration-300">
              <ShieldCheck className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Verified Listings</h3>
            <p className="text-gray-600 leading-relaxed font-medium">Every property and owner uses secure verification protocols ensuring absolute safety.</p>
          </div>

          <div className="bento-card p-10 group">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
              <Home className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Smart Curation</h3>
            <p className="text-gray-600 leading-relaxed font-medium">No hidden fees, no messy lists. See only properties that match your specific lifestyle.</p>
          </div>

          <div className="bento-card p-10 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 border border-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
              <Zap className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Instant Booking</h3>
            <p className="text-gray-600 leading-relaxed font-medium">Connect directly with owners through our integrated messaging and secure properties in minutes.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default LandingPage;