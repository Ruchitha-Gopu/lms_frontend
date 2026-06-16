import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

function ManageAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    course: "",
    title: "",
    description: "",
    dueDate: "",
    marks: 100,
    status: "Pending",
  });

  useEffect(() => {
    fetchAssignments();
    fetchUsers();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignments");
      setAssignments(res.data || []);
    } catch (error) {
      console.log("Assignments Error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data || []);
    } catch (error) {
      console.log("Users Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "marks" ? Number(e.target.value) : e.target.value,
    });
  };

  const addAssignment = async () => {
    if (
      !formData.userId ||
      !formData.course ||
      !formData.title ||
      !formData.description ||
      !formData.dueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/assignments", formData);

      alert("Assignment Added Successfully");

      setFormData({
        userId: "",
        course: "",
        title: "",
        description: "",
        dueDate: "",
        marks: 100,
        status: "Pending",
      });

      fetchAssignments();
    } catch (error) {
      console.log("Add Assignment Error:", error);
      alert("Failed to add assignment");
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await API.delete(`/assignments/${id}`);
      fetchAssignments();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-4 bg-light min-vh-100">
        <h2 className="mb-4">📝 Manage Assignments</h2>

        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 p-4 text-center">
              <h5>Total Assignments</h5>
              <h2>{assignments.length}</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 p-4 text-center">
              <h5>Pending</h5>
              <h2>
                {assignments.filter((item) => item.status === "Pending").length}
              </h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 p-4 text-center">
              <h5>Registered Users</h5>
              <h2>{users.length}</h2>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-4 mb-4">
          <h4 className="mb-3">Add New Assignment</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <select
                name="userId"
                className="form-control"
                value={formData.userId}
                onChange={handleChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="course"
                className="form-control"
                placeholder="Course Name"
                value={formData.course}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Assignment Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="date"
                name="dueDate"
                className="form-control"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="marks"
                className="form-control"
                placeholder="Marks"
                value={formData.marks}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <textarea
                name="description"
                className="form-control"
                placeholder="Assignment Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary w-100" onClick={addAssignment}>
            Add Assignment
          </button>
        </div>

        <div className="card shadow border-0 p-4">
          <h4 className="mb-3">Assignment List</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Course</th>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Marks</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {assignments.length > 0 ? (
                  assignments.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.userId?.name || "User"} <br />
                        <small>{item.userId?.email}</small>
                      </td>
                      <td>{item.course}</td>
                      <td>{item.title}</td>
                      <td>
                        {item.dueDate
                          ? new Date(item.dueDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td>{item.marks}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "Submitted"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAssignment(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Assignments Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAssignments;