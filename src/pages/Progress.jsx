import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { getLoggedUser } from "../utils/getUser";

function Progress() {
  const [progress, setProgress] = useState([]);

  const user = getLoggedUser();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await API.get(
        `/progress/user/${user.id}`
      );

      setProgress(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4">
        <h2 className="mb-4">
          📈 {user?.name}'s Progress
        </h2>

        {progress.length > 0 ? (
          progress.map((item) => (
            <div
              className="card shadow border-0 p-4"
              key={item._id}
            >
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="card p-3 text-center">
                    <h5>Total Courses</h5>
                    <h2>{item.totalCourses}</h2>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card p-3 text-center">
                    <h5>Completed</h5>
                    <h2>{item.completedCourses}</h2>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card p-3 text-center">
                    <h5>Assignments</h5>
                    <h2>{item.assignmentsSubmitted}</h2>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card p-3 text-center">
                    <h5>Quizzes</h5>
                    <h2>{item.quizzesCompleted}</h2>
                  </div>
                </div>
              </div>

              <h5 className="mt-4">
                Overall Progress
              </h5>

              <div
                className="progress"
                style={{ height: "25px" }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${item.progressPercentage}%`,
                  }}
                >
                  {item.progressPercentage}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-warning">
            No progress found for {user?.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default Progress;