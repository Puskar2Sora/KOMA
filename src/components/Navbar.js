import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, Plus, Heart, User } from "lucide-react";
import "../styles/navbar.css";

const springTransition = { type: "spring", stiffness: 400, damping: 28 };

function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" aria-label="Primary Navigation">
      <NavLink
        to="/"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <Home className="nav-icon" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <Search className="nav-icon" />
        <span>Search</span>
      </NavLink>

      {/* Center Yellow Floating Button (Post Room) */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.06 }}
        transition={springTransition}
        className="bottom-nav-fab"
        onClick={() => navigate(user ? "/add-room" : "/login")}
        aria-label="Post a room"
      >
        <div className="fab-circle">
          <Plus className="fab-icon" />
        </div>
        <span>Post</span>
      </motion.button>

      <NavLink
        to="/saved"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <Heart className="nav-icon" />
        <span>Saved</span>
      </NavLink>

      <NavLink
        to={user ? "/profile" : "/login"}
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <User className="nav-icon" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;