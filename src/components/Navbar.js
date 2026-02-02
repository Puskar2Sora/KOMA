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

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        KOMA
      </Link>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">Signup</Link>
          </>
        ) : (
          <div ref={ref} className="navbar-profile-wrapper">

            {/* 🔵 PROFILE AVATAR */}
            <div
              onClick={() => setOpen(!open)}
              className="profile-avatar"
            >
              {user.photo ? (
                <img
                  src={`http://localhost:5000${user.photo}`}
                  alt="profile"
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>

            {/* 🔽 DROPDOWN */}
            {open && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>

                <hr />

                <div className="dropdown-item">
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    👤 Profile
                  </Link>
                </div>

                <div className="dropdown-item">
                  <Link to="/my-rooms" onClick={() => setOpen(false)}>
                    🏠 My Rooms
                  </Link>
                </div>

                <div className="dropdown-item">
                  <Link to="/add-room" onClick={() => setOpen(false)}>
                    ➕ Add Room
                  </Link>
                </div>

                <hr />

                <div className="dropdown-item logout" onClick={logout}>
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
