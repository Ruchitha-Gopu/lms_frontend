import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

// Create these pages if not already created
import Assignments from "./pages/Assignments";
import Quiz from "./pages/Quiz";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";

// Admin Pages
import ManageUsers from "./pages/ManageUsers";
import ManageCourses from "./pages/ManageCourses";
import ManageAssignments from "./pages/ManageAssignments";
import ManageQuiz from "./pages/ManageQuiz";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/user-dashboard"
        element={<UserDashboard />}
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      {/* Courses */}
      <Route
        path="/courses"
        element={<Courses />}
      />

      <Route
        path="/courses/:id"
        element={<CourseDetails />}
      />

      

      <Route
        path="/assignments"
        element={<Assignments />}
      />

      <Route
        path="/quiz"
        element={<Quiz />}
      />

      <Route
        path="/progress"
        element={<Progress />}
      />

      <Route
        path="/certificates"
        element={<Certificates />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* Optional redirects */}
      <Route
        path="/user"
        element={
          <Navigate
            to="/user-dashboard"
            replace
          />
        }
      />

      <Route
        path="/admin"
        element={
          <Navigate
            to="/admin-dashboard"
            replace
          />
        }
      />
      <Route
  path="/manage-users"
  element={<ManageUsers />}
/>

<Route
  path="/manage-courses"
  element={<ManageCourses />}
/>

<Route
  path="/manage-assignments"
  element={<ManageAssignments />}
/>

<Route
  path="/manage-quiz"
  element={<ManageQuiz />}
/>


    </Routes>
  );
}

export default App;  