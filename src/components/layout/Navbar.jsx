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
    { name: "Post Room", path: "/add-room", icon: <PlusSquare className="w-4 h-4" /> },
  ];

  if (token) {
    navLinks.push({ name: "Profile", path: "/profile", icon: <User className="w-4 h-4" /> });
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold tracking-tight shadow-md"
            >
              K
            </motion.div>
            <span className="font-extrabold text-xl tracking-wide text-gray-900">
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
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-colors hover:bg-blue-50"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              <div className="w-px h-6 bg-gray-200 mx-2" />

              {!token ? (
                <div className="flex gap-4 items-center">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 transition-colors">Login</Link>
                  <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">Sign Up</Link>
                </div>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium"
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
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
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
            className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:bg-gray-50 flex items-center gap-3 px-4 py-3 rounded-xl font-medium"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              {!token ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-gray-600 hover:bg-gray-50 py-3 rounded-xl font-medium">Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-md">Sign Up</Link>
                </div>
              ) : (
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full text-left text-red-600 hover:bg-red-50 flex items-center gap-3 px-4 py-3 rounded-xl font-medium border-t border-gray-100 mt-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
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
