import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Home, PlusCircle, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import "../styles/navbar.css";
import { getCloudinaryAltText, getCloudinaryImageUrl } from "../utils/cloudinary";

const springTransition = { type: "spring", stiffness: 400, damping: 28 };

// Brand logo letter stagger animations
const logoContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const logoLetter = {
  hidden: { y: 5, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
};

function Navbar({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* 1. Left Section: Staggered Brand Logo */}
      <div className="navbar-left-zone">
        <Link to="/" className="navbar-logo">
          <motion.span 
            variants={logoContainer}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="logo-text"
          >
            {["K", "O", "M", "A"].map((char, index) => (
              <motion.span key={index} variants={logoLetter} className="inline-block">
                {char}
              </motion.span>
            ))}
            <motion.span 
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="dot-green inline-block"
            >
              .
            </motion.span>
          </motion.span>
        </Link>
      </div>

      {/* 2. Middle Section: Centered Home Action Shortcut */}
      <div className="navbar-center-zone">
        <motion.div
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.93 }}
          transition={springTransition}
        >
          <Link to="/" className="nav-center-home-btn" aria-label="Home">
            <Home className="w-5 h-5 text-emerald-600" />
            <motion.span 
              className="absolute bottom-1 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 base-dot"
              layoutId="activeIndicator"
            />
          </Link>
        </motion.div>
      </div>

      {/* 3. Right Section: Auth or Dropdown Actions */}
      <div className="navbar-right-zone">
        {!user ? (
          <div className="auth-links">
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ y: -1 }}>
              <Link to="/login" className="nav-btn-secondary">Login</Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ y: -1 }}>
              <Link to="/signup" className="nav-btn-primary">Signup</Link>
            </motion.div>
          </div>
        ) : (
          <div ref={ref} className="nav-profile-section">
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(!open)} 
              className={`profile-trigger ${open ? 'active' : ''}`}
            >
              <div className="avatar-circle">
                {user.photo ? (
                  <img src={getCloudinaryImageUrl(user.photo, user.photo)} alt={getCloudinaryAltText(user.photo, "user")} />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="trigger-arrow-box"
              >
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={springTransition}
                  className="modern-dropdown"
                >
                  <div className="dropdown-header">
                    <div className="header-avatar">
                       {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="header-text">
                      <strong>{user.name}</strong>
                      <p>{user.email}</p>
                    </div>
                  </div>

                  <div className="status-indicator">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified KOMA User</span>
                  </div>

                  <div className="dropdown-links">
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 350 }}>
                      <Link to="/profile" onClick={() => setOpen(false)}>
                        <User className="w-4 h-4 text-gray-400" /> My Profile
                      </Link>
                    </motion.div>
                    
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 350 }}>
                      <Link to="/my-rooms" onClick={() => setOpen(false)}>
                        <Home className="w-4 h-4 text-gray-400" /> Manage Listings
                      </Link>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 350 }}>
                      <Link to="/add-room" onClick={() => setOpen(false)}>
                        <PlusCircle className="w-4 h-4 text-gray-400" /> Post Property
                      </Link>
                    </motion.div>
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.96 }}
                    className="dropdown-logout" 
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;