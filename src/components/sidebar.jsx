import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="user-sidebar">
      <h2 className="sidebar-logo">LMS Pro</h2>

      <NavLink to="/user-dashboard" className="sidebar-link">
        📊 Dashboard
      </NavLink>

      <NavLink to="/courses" className="sidebar-link">
        📚 My Courses
      </NavLink>

      <NavLink to="/assignments" className="sidebar-link">
        📝 Assignments
      </NavLink>

      <NavLink to="/quiz" className="sidebar-link">
        ❓ Quiz
      </NavLink>

      <NavLink to="/progress" className="sidebar-link">
        📈 Progress
      </NavLink>

      <NavLink to="/certificates" className="sidebar-link">
        🏆 Certificates
      </NavLink>

      <NavLink to="/profile" className="sidebar-link">
        👤 Profile
      </NavLink>

      <NavLink to="/settings" className="sidebar-link">
        ⚙️ Settings
      </NavLink>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;