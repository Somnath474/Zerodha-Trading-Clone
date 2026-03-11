import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../auth/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://zerodha-trading-clone-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Pass token via URL to dashboard (cross-port localStorage fix)
        window.location.href = `https://zerodha-trading-clone-1.onrender.com?token=${data.token}`;
      } else {
        setError(data.msg || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand">
          <img src="/logo.png" alt="Zerodha" className="brand-logo" />
          <h1>Zerodha</h1>
          <p>India's No. 1 Stock Broker</p>
        </div>
        <div className="brand-stats">
          <div className="stat">
            <h3>1 Cr+</h3>
            <p>Active clients</p>
          </div>
          <div className="stat">
            <h3>₹4.5L Cr</h3>
            <p>Assets managed</p>
          </div>
          <div className="stat">
            <h3>15%</h3>
            <p>Of Indian retail volume</p>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Login to your trading account</p>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;