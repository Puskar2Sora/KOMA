import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, PlusSquare, User, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Add Room", path: "/add-room", icon: <PlusSquare className="w-4 h-4" /> },
  ];

  if (token) {
    navLinks.push({ name: "Profile", path: "/profile", icon: <User className="w-4 h-4" /> });
  }

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold"
            >
              K
            </motion.div>
            <span className="font-extrabold text-xl tracking-wider neon-text-primary">
              KOMA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              {!token ? (
                <div className="flex gap-4 ml-4">
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2">Login</Link>
                  <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(147,51,234,0.5)]">Sign Up</Link>
                </div>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 px-3 py-2 transition-colors ml-4"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white flex items-center gap-3 px-3 py-3 rounded-md font-medium"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              {!token ? (
                <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-gray-300 hover:text-white py-2">Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">Sign Up</Link>
                </div>
              ) : (
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full text-left text-red-400 hover:text-red-300 flex items-center gap-3 px-3 py-3 font-medium border-t border-white/10 mt-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
