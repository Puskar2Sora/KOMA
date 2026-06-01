import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/navbar.css";
import { getCloudinaryAltText, getCloudinaryImageUrl } from "../utils/cloudinary";

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
      <Link to="/" className="navbar-logo">KOMA</Link>

      <div className="navbar-right">
        {!user ? (
          <div className="auth-links">
            <Link to="/login" className="nav-btn-secondary">Login</Link>
            <Link to="/signup" className="nav-btn-primary">Signup</Link>
          </div>
        ) : (
          <div ref={ref} className="nav-profile-section">
            <button 
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
              <span className="trigger-arrow">▾</span>
            </button>

            {open && (
              <div className="modern-dropdown">
                <div className="dropdown-header">
                  <div className="header-avatar">
                     {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="header-text">
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                  </div>
                </div>

                {/* 🛡️ Show a universal 'Verified' badge for hackathon trust */}
                <div className="status-indicator">
                  <span className="dot verified"></span>
                  Verified KOMA User
                </div>

                <div className="dropdown-links">
                  <Link to="/profile" onClick={() => setOpen(false)}>👤 My Profile</Link>
                  
                  {/* 🔥 HACKATHON: Always show owner links to logged-in users */}
                  <Link to="/my-rooms" onClick={() => setOpen(false)}>🏠 Manage Listings</Link>
                  <Link to="/add-room" onClick={() => setOpen(false)}>➕ Post Property</Link>
                </div>

                <button className="dropdown-logout" onClick={logout}>🚪 Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;