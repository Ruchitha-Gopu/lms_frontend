import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Profile() {
  const loggedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = loggedUser.id || loggedUser._id;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: loggedUser.name || "",
    email: loggedUser.email || "",
    phone: "",
    education: "",
    role: loggedUser.role || "Student",
    skills: [],
  });

  const [formData, setFormData] = useState({
    name: loggedUser.name || "",
    email: loggedUser.email || "",
    phone: "",
    education: "",
    role: loggedUser.role || "Student",
    skills: "",
  });

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/profile/user/${userId}`);
      const data = res.data || {};

      setProfile({
        name: data.name || loggedUser.name || "",
        email: data.email || loggedUser.email || "",
        phone: data.phone || "",
        education: data.education || "",
        role: data.role || loggedUser.role || "Student",
        skills: Array.isArray(data.skills) ? data.skills : [],
      });

      setFormData({
        name: data.name || loggedUser.name || "",
        email: data.email || loggedUser.email || "",
        phone: data.phone || "",
        education: data.education || "",
        role: data.role || loggedUser.role || "Student",
        skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
      });
    } catch (error) {
      console.log("Profile API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const updatedData = {
        userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        role: formData.role,
        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
      };

      const res = await API.put(`/profile/user/${userId}`, updatedData);

      setProfile(res.data);
      setIsEditing(false);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log("Profile Update Error:", error);
      alert("Profile Update Failed");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
        <h2 className="mb-4">👤 My Profile</h2>

        {loading && (
          <div className="alert alert-info shadow-sm border-0">
            Loading profile data...
          </div>
        )}

        {!userId && (
          <div className="alert alert-danger shadow-sm border-0">
            User ID not found. Please login again.
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow border-0 p-4">
              {!isEditing ? (
                <>
                  <div className="text-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="Profile"
                      width="120"
                    />

                    <h3 className="mt-3">
                      {profile.name || loggedUser.name || "Student"}
                    </h3>

                    <span className="badge bg-primary">
                      {profile.role || "Student"}
                    </span>
                  </div>

                  <hr />

                  <p>
                    <strong>Email:</strong>{" "}
                    {profile.email || loggedUser.email || "Not added"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {profile.phone || "Not added"}
                  </p>

                  <p>
                    <strong>Education:</strong>{" "}
                    {profile.education || "Not added"}
                  </p>

                  <p>
                    <strong>Skills:</strong>{" "}
                    {profile.skills?.length > 0
                      ? profile.skills.join(", ")
                      : "Not added"}
                  </p>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <h4 className="mb-3">Edit Profile</h4>

                  <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="phone"
                    className="form-control mb-3"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="education"
                    className="form-control mb-3"
                    placeholder="Education"
                    value={formData.education}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="role"
                    className="form-control mb-3"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="skills"
                    className="form-control mb-3"
                    placeholder="React, NodeJS, MongoDB"
                    value={formData.skills}
                    onChange={handleChange}
                  />

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary w-50"
                      onClick={saveProfile}
                      disabled={!userId}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary w-50"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;