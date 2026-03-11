import React from "react";
import "./Apps.css";

const Apps = () => {
  return (
    <div className="apps-container">

      <h1 className="apps-title">Trading Apps</h1>
      <p className="apps-subtitle">
        Access your trading tools and portfolio analytics
      </p>

      <div className="apps-grid">

        <div className="app-card">
          <h2>📈 Market Watch</h2>
          <p>Track live stock prices and monitor market movements.</p>
        </div>

        <div className="app-card">
          <h2>💼 Portfolio</h2>
          <p>View your holdings, positions and portfolio performance.</p>
        </div>

        <div className="app-card">
          <h2>🧾 Orders</h2>
          <p>Check your buy and sell order history.</p>
        </div>

        <div className="app-card">
          <h2>📊 Analytics</h2>
          <p>Analyze your profit, loss and trading performance.</p>
        </div>

      </div>

    </div>
  );
};

export default Apps;