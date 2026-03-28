import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, UserPlus } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      const res = await axios.post("https://koma-backend-801z.onrender.com/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Registration failed"}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 bg-gray-50/50">
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bento-card p-8 sm:p-12 w-full max-w-md shadow-xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Create Account</h2>
          <p className="text-gray-500 font-medium">Join thousands finding their perfect stay.</p>
        </div>

        <button 
          onClick={handleGoogleAuth} 
          className="w-full py-4 px-4 flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold tracking-wide rounded-2xl transition-all shadow-sm mb-6"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-gray-400 font-medium text-sm tracking-wide uppercase">Or register safely</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="name" 
              type="text" 
              placeholder="Full Name" 
              required 
              onChange={handleChange} 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none transition-all shadow-inner font-medium placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              required 
              onChange={handleChange} 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none transition-all shadow-inner font-medium placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="password" 
              type="password" 
              placeholder="Create Password" 
              required 
              onChange={handleChange} 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none transition-all shadow-inner font-medium placeholder:text-gray-400"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-8 bg-gray-900 hover:bg-black text-white font-extrabold tracking-wide rounded-2xl flex justify-center items-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 text-lg"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5" /> Sign Up</>}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold ml-1 transition-colors">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
