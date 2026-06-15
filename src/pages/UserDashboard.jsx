import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get(`/dashboard/user/${user.id}`);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
      <Sidebar />

      <main className="container-fluid p-3 p-md-4">
        <div className="dashboard-hero mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              🎓 Welcome, {user.name || "Student"}
            </h2>
            <p className="mb-0">
              Track your assignments, certificates, quizzes and learning
              progress.
            </p>
          </div>

          <div className="hero-badge">
            {dashboard.progressPercentage}% Completed
          </div>
        </div>

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
            title="Submitted"
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

        <div className="card shadow-sm border-0 p-4 mt-4 progress-card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">📈 Learning Progress</h4>
            <span className="badge bg-primary">
              {dashboard.progressPercentage}%
            </span>
          </div>

          <div className="progress" style={{ height: "28px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{
                width: `${dashboard.progressPercentage}%`,
              }}
            >
              {dashboard.progressPercentage}%
            </div>
          </div>
        </div>

        {dashboard.totalAssignments === 0 &&
          dashboard.totalCertificates === 0 &&
          dashboard.progressPercentage === 0 && (
            <div className="alert alert-warning mt-4 shadow-sm border-0">
              No learning data found for {user.name || "this user"}. Admin needs
              to assign assignments, progress, and certificates for this user.
            </div>
          )}
      </main>

      <style>
        {`
          .dashboard-hero {
            background: linear-gradient(135deg, #0d6efd, #6610f2);
            color: white;
            border-radius: 22px;
            padding: 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            box-shadow: 0 14px 30px rgba(13, 110, 253, 0.25);
          }

          .hero-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 12px 18px;
            border-radius: 30px;
            font-weight: 700;
            white-space: nowrap;
          }

          .dashboard-card {
            border-radius: 18px;
            transition: all 0.3s ease;
          }

          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important;
          }

          .dashboard-icon {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
          }

          .progress-card {
            border-radius: 18px;
          }

          @media (max-width: 768px) {
            .dashboard-hero {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </div>
  );
}

function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card dashboard-card shadow-sm border-0 p-4 h-100">
        <div className="d-flex align-items-center gap-3">
          <div className={`dashboard-icon bg-${color} bg-opacity-10`}>
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