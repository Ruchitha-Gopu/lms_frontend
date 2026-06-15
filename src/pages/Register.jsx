import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

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
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>🎓 LMS Registration</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />

          <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
            <option value="user">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Please wait while processing Your request" : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: "420px",
  background: "#fff",
  borderRadius: "15px",
  padding: "35px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
};

export default Register;