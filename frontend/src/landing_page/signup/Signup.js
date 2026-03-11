import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth/Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.msg || "Signup failed.");
      }
    } catch (err) {
      setError("Cannot connect to server.");
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
          <p>Start your trading journey today</p>
        </div>
        <ul className="brand-features">
          <li>✅ Zero brokerage on equity delivery</li>
          <li>✅ Flat ₹20 per order on F&O</li>
          <li>✅ Free direct mutual fund investments</li>
          <li>✅ Advanced charting & analytics</li>
        </ul>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create account</h2>
          <p className="auth-subtitle">Join 1 crore+ traders on Zerodha</p>

          {error && <div className="auth-error"><span>⚠️</span> {error}</div>}
          {success && <div className="auth-success"><span>✅</span> {success}</div>}

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && (
                <div className="password-strength">
                  <div
                    className={`strength-bar ${
                      password.length >= 10 ? "strong" :
                      password.length >= 6 ? "medium" : "weak"
                    }`}
                  ></div>
                  <span>
                    {password.length >= 10 ? "Strong" :
                     password.length >= 6 ? "Medium" : "Weak"}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;