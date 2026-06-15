import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#4f46e5,#7c3aed)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "15px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🎓 LMS Registration
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Create your account
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="user">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
};

export default Register;