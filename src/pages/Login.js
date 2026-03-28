import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    window.open("https://koma-backend-801z.onrender.com/api/auth/google", "_self");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://koma-backend-801z.onrender.com/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Login failed"}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 sm:p-10 rounded-3xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Log in to manage your spaces</p>
        </div>

        <button 
          onClick={handleGoogleAuth} 
          className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-colors mb-6"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-gray-500 text-sm">Or sign in with email</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              required 
              onChange={handleChange} 
              className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-gray-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              onChange={handleChange} 
              className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-gray-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ArrowRight className="w-5 h-5" /> Sign In</>}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-bold ml-1">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
