import React, { useEffect, useState, useContext } from "react";
import "../assets/styles/RegistrationForm.css";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

function RegistrationForm({toggleFormState}) {
  const navigate = useNavigate();
  const { register, checkAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // update authstatus on reload
  useEffect(() => {
    checkAuth();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const response = await register(formData);
      if (response.includes("Error")) {
        setError(response);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <a onClick = {()=>{toggleFormState()}} className="toggle-authform">Have an account already? Login now!</a>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="error-prompt">{error}</div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
