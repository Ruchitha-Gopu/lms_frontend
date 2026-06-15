import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import "./Settings.css";

function Settings() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      darkMode: false,
      notifications: true,
    });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get(
        `/settings/user/${user.id}`
      );

      setFormData({
        name: res.data.name || user.name || "",
        email: res.data.email || user.email || "",
        password: res.data.password || "",
        darkMode: res.data.darkMode || false,
        notifications:
          res.data.notifications ?? true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const saveSettings = async () => {
    try {
      await API.put(
        `/settings/user/${user.id}`,
        {
          userId: user.id,
          ...formData,
        }
      );

      alert("Settings Updated");
    } catch (error) {
      console.log(error);
      alert("Settings Update Failed");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div
        className={`container-fluid p-3 p-md-4 ${
          formData.darkMode
            ? "settings-dark"
            : ""
        }`}
      >
        <h2 className="mb-4">⚙️ Settings</h2>

        <div className="card shadow border-0 p-4">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-check form-switch mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Dark Mode
            </label>
          </div>

          <div className="form-check form-switch mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Enable Notifications
            </label>
          </div>

          <button
            className="btn btn-primary"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;