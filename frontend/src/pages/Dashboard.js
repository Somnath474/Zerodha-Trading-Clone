import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [holdings, setHoldings] = useState([]);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await fetch("https://zerodha-trading-clone-1.onrender.com/allHoldings", {
          headers: { Authorization: token }
        });

        if (res.status === 401) {
          alert("Token expired. Login again.");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setHoldings(data);
      } catch (err) {
        alert("Failed to fetch holdings. Try again.");
        console.error(err);
      }
    };

    fetchHoldings();
  }, [token, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Holdings</h2>
      <ul>
        {holdings.map(h => (
          <li key={h._id}>{h.name} - Qty: {h.qty} - Price: {h.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;