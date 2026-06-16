import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import "./Settings.css";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || user._id;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    phone: "",
    education: "",
    darkMode: false,
    notifications: true,
  });

  useEffect(() => {
    if (userId) {
      fetchSettings();
    }
  }, [userId]);

  useEffect(() => {
    if (formData.darkMode) {
      document.body.classList.add("app-dark-mode");
    } else {
      document.body.classList.remove("app-dark-mode");
    }
  }, [formData.darkMode]);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/settings/user/${userId}`);
      const data = res.data || {};

      setFormData({
        name: data.name || user.name || "",
        email: data.email || user.email || "",
        password: "",
        phone: data.phone || "",
        education: data.education || "",
        darkMode: data.darkMode || false,
        notifications: data.notifications ?? true,
      });
    } catch (error) {
      console.log("Settings API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = async () => {
    try {
      await API.put(`/settings/user/${userId}`, {
        userId,
        ...formData,
      });

      alert("Settings Updated Successfully");
    } catch (error) {
      console.log("Settings Update Error:", error);
      alert("Settings Update Failed");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row settings-page">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 min-vh-100">
        <h2 className="mb-4">⚙️ Account Settings</h2>

        {loading && (
          <div className="alert alert-info shadow-sm border-0">
            Loading settings...
          </div>
        )}

        {!userId && (
          <div className="alert alert-danger shadow-sm border-0">
            User ID not found. Please login again.
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="settings-card card shadow border-0 p-4">
              <h4 className="fw-bold mb-3">Personal Information</h4>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Education</label>
                  <input
                    type="text"
                    name="education"
                    className="form-control"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="BTech, Degree..."
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave empty if you do not want to change"
                  />
                </div>
              </div>

              <hr />

              <h4 className="fw-bold mb-3">Preferences</h4>

              <div className="settings-option">
                <div>
                  <h6 className="mb-1">Dark Mode</h6>
                  <p className="text-muted mb-0">
                    Enable dark theme for full website
                  </p>
                </div>

                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="darkMode"
                    checked={formData.darkMode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="settings-option">
                <div>
                  <h6 className="mb-1">Notifications</h6>
                  <p className="text-muted mb-0">
                    Receive course and assignment updates
                  </p>
                </div>

                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={saveSettings}
                disabled={!userId}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;