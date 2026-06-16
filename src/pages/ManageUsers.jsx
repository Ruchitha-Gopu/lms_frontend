import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data || []);
    } catch (error) {
      console.log("Fetch Users Error:", error);
      alert("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/auth/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log("Delete User Error:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
        <h2 className="mb-4">👥 Manage Registered Users</h2>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card shadow border-0 p-4 text-center h-100">
              <h5>Total Users</h5>
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow border-0 p-4 text-center h-100">
              <h5>Students</h5>
              <h2>{users.filter((u) => u.role === "user").length}</h2>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow border-0 p-4 text-center h-100">
              <h5>Admins</h5>
              <h2>{users.filter((u) => u.role === "admin").length}</h2>
            </div>
          </div>
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
                  <th>Joined Date</th>
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
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Registered Users Found
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