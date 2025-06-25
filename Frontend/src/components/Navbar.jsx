import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="nav-brand" to="/">EventPlanner</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Events</Link>
            <Link to="/my-rsvps">My RSVPs</Link>
            {user?.role === "Admin" && <Link to="/admin">Admin Dashboard</Link>}
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
