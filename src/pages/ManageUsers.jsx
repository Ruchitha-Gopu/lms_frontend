import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

function ManageUsers() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    status: "Active",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch users");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.course.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/students", formData);

      alert("User Added Successfully");

      setFormData({
        name: "",
        email: "",
        course: "",
        status: "Active",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed To Add User");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete User");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-3 p-md-4">
        <h2 className="mb-4">👥 Manage Users</h2>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <div className="card shadow border-0 p-4 text-center h-100">
              <h5>Total Users</h5>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow border-0 p-4 text-center h-100">
              <h5>Active Users</h5>
              <h2>
                {
                  students.filter(
                    (user) => user.status === "Active"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 p-md-4 mb-4">
          <h4 className="mb-3">Add New User</h4>

          <div className="row g-3">
            <div className="col-12 col-md-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                type="text"
                name="course"
                className="form-control"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-3">
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={addStudent}
          >
            Add User
          </button>
        </div>

        <div className="card shadow border-0 p-3 p-md-4">
          <h4 className="mb-3">User List</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>
                        <span
                          className={`badge ${
                            student.status === "Active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteStudent(student._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Users Found
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

export default ManageUsers;