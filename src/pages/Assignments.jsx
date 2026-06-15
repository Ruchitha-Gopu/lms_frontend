import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await API.get(
        `/assignments/user/${user.id}`
      );

      setAssignments(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };

  const submitAssignment = async (id) => {
    try {
      await API.put(
        `/assignments/${id}`,
        {
          status: "Submitted",
        }
      );

      fetchAssignments();
    } catch (error) {
      console.log(error);
      alert("Failed to submit assignment");
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4">
        <h2 className="mb-4">📝 My Assignments</h2>

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
                      <strong>Due:</strong> {item.dueDate}
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
                        {item.status}
                      </span>
                    </p>

                    <button
                      className={`btn mt-auto ${
                        item.status === "Submitted"
                          ? "btn-success"
                          : "btn-primary"
                      }`}
                      disabled={item.status === "Submitted"}
                      onClick={() =>
                        submitAssignment(item._id)
                      }
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
            <div className="alert alert-warning">
              No assignments found for {user?.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assignments;