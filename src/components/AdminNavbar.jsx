import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "nav-link admin-active"
      : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-navbar shadow">
      <div className="container-fluid">

        <NavLink
          className="navbar-brand fw-bold"
          to="/admin-dashboard"
        >
          LMS Admin
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink
                to="/admin-dashboard"
                className={activeClass}
                end
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/manage-users"
                className={activeClass}
              >
                Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/manage-courses"
                className={activeClass}
              >
                Courses
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/manage-assignments"
                className={activeClass}
              >
                Assignments
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/manage-quiz"
                className={activeClass}
              >
                Quiz
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                className="btn btn-danger btn-sm px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;