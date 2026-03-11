import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [holdings, setHoldings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchHoldings = async () => {
      try {
        const res = await fetch("http://localhost:3002/allHoldings", {
          headers: { Authorization: `Bearer ${token}` } // ✅ Bearer added
        });

        if (res.status === 401) {
          navigate("/");
          return;
        }

        const data = await res.json();
        setHoldings(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHoldings();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Holdings</h2>
      <ul>
        {holdings.map(h => (
          <li key={h._id}>
            {h.name} - Qty: {h.qty} - Price: {h.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;