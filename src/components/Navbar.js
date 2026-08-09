import { NavLink } from "react-router-dom";
import { 
  Settings, 
  Car, 
  Wallet, 
  Plus, 
  History, 
  Map, 
  BarChart2 
} from "lucide-react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="bottom-nav" aria-label="Primary Navigation">
      <NavLink to="/settings" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
        <Settings className="nav-icon" />
        <span>Settings</span>
      </NavLink>

      <NavLink to="/vehicles" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
        <Car className="nav-icon" />
        <span>Vehicles</span>
      </NavLink>

      <NavLink to="/wallet" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
        <Wallet className="nav-icon" />
        <span>Wallet</span>
      </NavLink>

      {/* Center Floating Action Button */}
      <NavLink to="/offer" className="bottom-nav-fab" aria-label="Offer Ride">
        <div className="fab-circle">
          <Plus className="fab-icon" />
        </div>
        <span>Offer</span>
      </NavLink>

      <NavLink to="/history" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
        <History className="nav-icon" />
        <span>History</span>
      </NavLink>

      <NavLink to="/trips" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
        <Map className="nav-icon" />
        <span>Trips</span>
      </NavLink>

      <NavLink to="/report" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
        <BarChart2 className="nav-icon" />
        <span>Report</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;