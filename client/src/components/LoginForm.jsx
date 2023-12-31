/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from "react";
import "../assets/styles/LoginForm.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm({ toggleFormState }) {
  const navigate = useNavigate();
  const { login, checkAuth,testCookie } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(formData);
    if (response.includes("Error")) {
      setError(response);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
        <p onClick={()=>{testCookie()}}>Test Cookie</p>
      <a
        onClick={() => {
          toggleFormState();
        }}
        className="toggle-authform"
      >
        Do not have an account? Register now!
      </a>
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
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="error-prompt">{error}</div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
