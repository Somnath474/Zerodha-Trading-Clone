import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      alert("Server error. Try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} required />
        <br /><br />
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
        <br /><br />
        <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
        <br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;