import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || user._id;

  const [dashboard, setDashboard] = useState({
    totalAssignments: 0,
    pendingAssignments: 0,
    submittedAssignments: 0,
    totalCertificates: 0,
    totalCourses: 0,
    completedCourses: 0,
    quizzesCompleted: 0,
    progressPercentage: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchDashboard();
    }
  }, [userId]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/dashboard/user/${userId}`);

      setDashboard({
        totalAssignments: res.data?.totalAssignments || 0,
        pendingAssignments: res.data?.pendingAssignments || 0,
        submittedAssignments: res.data?.submittedAssignments || 0,
        totalCertificates: res.data?.totalCertificates || 0,
        totalCourses: res.data?.totalCourses || 0,
        completedCourses: res.data?.completedCourses || 0,
        quizzesCompleted: res.data?.quizzesCompleted || 0,
        progressPercentage: res.data?.progressPercentage || 0,
      });
    } catch (error) {
      console.log("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
        <h2 className="mb-4">🎓 User Dashboard</h2>

        <div className="card shadow border-0 p-4 mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h3 className="fw-bold mb-1">
                Welcome, {user.name || "Student"}
              </h3>
              <p className="text-muted mb-0">
                Track your assignments, certificates, quizzes and learning progress.
              </p>
            </div>

            <span className="badge bg-primary fs-6 p-3">
              {dashboard.progressPercentage}% Completed
            </span>
          </div>
        </div>

        {loading && (
          <div className="alert alert-info shadow-sm border-0">
            Loading dashboard data...
          </div>
        )}

        <div className="row g-3">
          <DashboardCard
            icon="📝"
            title="Total Assignments"
            value={dashboard.totalAssignments}
            color="primary"
          />

          <DashboardCard
            icon="⏳"
            title="Pending Assignments"
            value={dashboard.pendingAssignments}
            color="warning"
          />

          <DashboardCard
            icon="✅"
            title="Submitted Assignments"
            value={dashboard.submittedAssignments}
            color="success"
          />

          <DashboardCard
            icon="🏆"
            title="Certificates"
            value={dashboard.totalCertificates}
            color="info"
          />
        </div>

        <div className="row g-3 mt-1">
          <DashboardCard
            icon="📚"
            title="Total Courses"
            value={dashboard.totalCourses}
            color="secondary"
          />

          <DashboardCard
            icon="🎯"
            title="Completed Courses"
            value={dashboard.completedCourses}
            color="success"
          />

          <DashboardCard
            icon="🧠"
            title="Quizzes Completed"
            value={dashboard.quizzesCompleted}
            color="danger"
          />
        </div>

        <div className="card shadow border-0 p-4 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">📈 Learning Progress</h4>
            <span className="badge bg-primary">
              {dashboard.progressPercentage}%
            </span>
          </div>

          <div className="progress" style={{ height: "28px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${dashboard.progressPercentage}%` }}
            >
              {dashboard.progressPercentage}%
            </div>
          </div>
        </div>

        {!loading &&
          dashboard.totalAssignments === 0 &&
          dashboard.totalCertificates === 0 &&
          dashboard.progressPercentage === 0 && (
            <div className="alert alert-warning mt-4 shadow-sm border-0">
              No learning data found for {user.name || "this user"}.
            </div>
          )}
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card shadow border-0 p-4 h-100 dashboard-card">
        <div className="d-flex align-items-center gap-3">
          <div
            className={`bg-${color} bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center`}
            style={{
              width: "55px",
              height: "55px",
              fontSize: "26px",
            }}
          >
            {icon}
          </div>

          <div>
            <h3 className="fw-bold mb-0">{value}</h3>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;