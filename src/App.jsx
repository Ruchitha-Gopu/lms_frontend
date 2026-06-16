import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Assignments from "./pages/Assignments";
import Quiz from "./pages/Quiz";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";

import ManageUsers from "./pages/ManageUsers";
import ManageCourses from "./pages/ManageCourses";
import ManageAssignments from "./pages/ManageAssignments";
import ManageQuiz from "./pages/ManageQuiz";

function App() {
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";

    if (darkMode) {
      document.body.classList.add("app-dark-mode");
    } else {
      document.body.classList.remove("app-dark-mode");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      <Route path="/assignments" element={<Assignments />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/user" element={<Navigate to="/user-dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />

      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-courses" element={<ManageCourses />} />
      <Route path="/manage-assignments" element={<ManageAssignments />} />
      <Route path="/manage-quiz" element={<ManageQuiz />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;