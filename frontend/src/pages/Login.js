import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://zerodha-trading-clone-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store token in localStorage (optional, backend authentication use ke liye)
        localStorage.setItem("token", data.token);

        alert("Login successful! Redirecting to dashboard...");

        // ✅ Full redirect to the dashboard running on port 3001
        window.location.href = "https://zerodha-trading-clone-1.onrender.com";
      } else {
        alert(data.msg || "Login failed. Check credentials.");
      }
    } catch (err) {
      alert("Server error. Try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
        <label>Email:</label><br />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <label>Password:</label><br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;