import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL | BUY | SELL

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/allOrders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Orders fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "ALL" ? orders : orders.filter((o) => o.mode === filter);

  if (loading) {
    return <div className="loading-text">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders empty-state">
        <div className="empty-icon">📋</div>
        <h3>No orders yet</h3>
        <p>Your buy and sell orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h3 className="title">Orders ({orders.length})</h3>
        <div className="filter-tabs">
          {["ALL", "BUY", "SELL"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, index) => (
              <tr key={index}>
                <td><strong>{order.name}</strong></td>
                <td>
                  <span className={`badge ${order.mode === "BUY" ? "badge-buy" : "badge-sell"}`}>
                    {order.mode}
                  </span>
                </td>
                <td>{order.qty}</td>
                <td>₹{Number(order.price).toFixed(2)}</td>
                <td>₹{(order.qty * order.price).toFixed(2)}</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;