import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import "./Settings.css";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || user._id;

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

  const applyDarkMode = (value) => {
    localStorage.setItem("darkMode", value);

    if (value) {
      document.body.classList.add("app-dark-mode");
    } else {
      document.body.classList.remove("app-dark-mode");
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await API.get(`/settings/user/${userId}`);

      const data = res.data || {};

      setFormData({
        name: data.name || user.name || "",
        email: data.email || user.email || "",
        password: data.password || "",
        phone: data.phone || "",
        education: data.education || "",
        darkMode: data.darkMode ?? false,
        notifications: data.notifications ?? true,
      });

      applyDarkMode(data.darkMode ?? false);
    } catch (error) {
      console.log(
        "Fetch Settings Error:",
        error.response?.data || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "darkMode") {
      applyDarkMode(newValue);
    }
  };

  const saveSettings = async () => {
    try {
      if (!userId) {
        alert("User not found. Please login again.");
        return;
      }

      await API.put(`/settings/user/${userId}`, {
        ...formData,
        userId,
      });

      alert("Settings Updated Successfully");
    } catch (error) {
      console.log(
        "Settings Update Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Settings Update Failed"
      );
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row settings-page">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 min-vh-100">
        <h2 className="mb-4">⚙️ Account Settings</h2>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="settings-card card shadow border-0 p-4">
              <h4 className="fw-bold mb-3">Personal Information</h4>

              <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Full Name"
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
                type="password"
                name="password"
                className="form-control mb-3"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
              />

              <hr />

              <div className="settings-option">
                <div>
                  <h6>Dark Mode</h6>
                  <p className="text-muted mb-0">
                    Change full website theme
                  </p>
                </div>

                <input
                  type="checkbox"
                  className="form-check-input"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                />
              </div>

              <div className="settings-option">
                <div>
                  <h6>Notifications</h6>
                  <p className="text-muted mb-0">
                    Enable course updates
                  </p>
                </div>

                <input
                  type="checkbox"
                  className="form-check-input"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={saveSettings}
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