import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/navbar.css";

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
                  <img src={`https://koma-backend-801z.onrender.com${user.photo}`} alt="user" />
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

                <div className="status-indicator">
                  <span className={`dot ${user.verificationStatus || 'unverified'}`}></span>
                  {user.verificationStatus === "verified" ? "Verified Owner" : "Unverified Seeker"}
                </div>

                <div className="dropdown-links">
                  <Link to="/profile" onClick={() => setOpen(false)}>👤 My Profile</Link>
                  
                  {user.verificationStatus === "verified" ? (
                    <>
                      <Link to="/my-rooms" onClick={() => setOpen(false)}>🏠 Manage Listings</Link>
                      <Link to="/add-room" onClick={() => setOpen(false)}>➕ Post Property</Link>
                    </>
                  ) : (
                    <Link to="/verify-owner" className="verify-highlight" onClick={() => setOpen(false)}>
                      🛡️ Verify Identity
                    </Link>
                  )}
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