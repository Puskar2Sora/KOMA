import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";
import "../styles/navbar.css";

const springTransition = { type: "spring", stiffness: 400, damping: 28 };

function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <NavLink
        to="/"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </NavLink>

      {/* Center raised action — always routes to Post Room */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.06 }}
        transition={springTransition}
        className="bottom-nav-fab"
        onClick={() => navigate(user ? "/add-room" : "/login")}
        aria-label="Post a room"
      >
        <PlusCircle className="w-6 h-6" />
      </motion.button>

      <NavLink
        to="/saved"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <Heart className="w-5 h-5" />
        <span>Saved</span>
      </NavLink>

      <NavLink
        to={user ? "/profile" : "/login"}
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;