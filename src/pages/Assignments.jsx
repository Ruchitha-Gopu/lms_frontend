import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || user._id;

  useEffect(() => {
    if (userId) {
      fetchAssignments();
    }
  }, [userId]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/assignments/user/${userId}`);
      setAssignments(res.data || []);
    } catch (error) {
      console.log("Assignments API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitAssignment = async (id) => {
    try {
      await API.put(`/assignments/${id}`, {
        status: "Submitted",
      });

      fetchAssignments();
    } catch (error) {
      console.log("Submit Assignment Error:", error);
      alert("Failed to submit assignment");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
        <h2 className="mb-4">📝 My Assignments</h2>

        {loading && (
          <div className="alert alert-info shadow-sm border-0">
            Loading assignments...
          </div>
        )}

        {!userId && (
          <div className="alert alert-danger shadow-sm border-0">
            User ID not found. Please login again.
          </div>
        )}

        <div className="row g-3 g-md-4">
          {assignments.length > 0 ? (
            assignments.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5>{item.title}</h5>

                    <p
                      className="text-muted"
                      style={{
                        height: "70px",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>

                    <p>
                      <strong>Due:</strong>{" "}
                      {item.dueDate
                        ? new Date(item.dueDate).toLocaleDateString()
                        : "No due date"}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          item.status === "Submitted"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </p>

                    <button
                      className={`btn mt-auto ${
                        item.status === "Submitted"
                          ? "btn-success"
                          : "btn-primary"
                      }`}
                      disabled={item.status === "Submitted"}
                      onClick={() => submitAssignment(item._id)}
                    >
                      {item.status === "Submitted"
                        ? "Submitted ✓"
                        : "Submit Assignment"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading &&
            userId && (
              <div className="alert alert-warning shadow-sm border-0">
                No assignments found for {user.name || "this user"}.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Assignments;