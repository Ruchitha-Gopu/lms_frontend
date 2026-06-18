import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
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

  const addUser = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill name and email");
      return;
    }

    try {
      await API.post("/users", formData);

      alert("User Added Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed To Add User"
      );
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
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
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow border-0 p-4 text-center h-100">
              <h5>Normal Users</h5>
              <h2>
                {
                  users.filter(
                    (user) => user.role === "user"
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
                type="password"
                name="password"
                className="form-control"
                placeholder="Password default 123456"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-3">
              <select
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={addUser}
          >
            Add User
          </button>
        </div>

        <div className="card shadow border-0 p-3 p-md-4">
          <h4 className="mb-3">Registered User List</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteUser(user._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center"
                    >
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