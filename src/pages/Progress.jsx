import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { getLoggedUser } from "../utils/getUser";

function Progress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = getLoggedUser() || {};
  const userId = user.id || user._id;

  useEffect(() => {
    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  const fetchProgress = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/progress/user/${userId}`);
      setProgress(res.data || []);
    } catch (error) {
      console.log("Progress API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
        <h2 className="mb-4">📈 {user?.name || "Student"}'s Progress</h2>

        {loading && (
          <div className="alert alert-info shadow-sm border-0">
            Loading progress data...
          </div>
        )}

        {!userId && (
          <div className="alert alert-danger shadow-sm border-0">
            User ID not found. Please login again.
          </div>
        )}

        {progress.length > 0 ? (
          progress.map((item) => (
            <div className="card shadow border-0 p-4 mb-4" key={item._id}>
              <div className="row g-3">
                <ProgressCard
                  icon="📚"
                  title="Total Courses"
                  value={item.totalCourses}
                  color="primary"
                />

                <ProgressCard
                  icon="✅"
                  title="Completed"
                  value={item.completedCourses}
                  color="success"
                />

                <ProgressCard
                  icon="📝"
                  title="Assignments"
                  value={item.assignmentsSubmitted}
                  color="warning"
                />

                <ProgressCard
                  icon="🧠"
                  title="Quizzes"
                  value={item.quizzesCompleted}
                  color="danger"
                />
              </div>

              <div className="card border-0 bg-light p-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Overall Progress</h5>

                  <span className="badge bg-primary fs-6">
                    {item.progressPercentage || 0}%
                  </span>
                </div>

                <div className="progress" style={{ height: "28px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{
                      width: `${item.progressPercentage || 0}%`,
                    }}
                  >
                    {item.progressPercentage || 0}%
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading &&
          userId && (
            <div className="alert alert-warning shadow-sm border-0">
              No progress found for {user?.name || "this user"}.
            </div>
          )
        )}
      </div>
    </div>
  );
}

function ProgressCard({ icon, title, value, color }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card shadow-sm border-0 h-100 p-3">
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
            <h3 className="fw-bold mb-0">{value || 0}</h3>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;