import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [orderType, setOrderType] = useState("MARKET"); // MARKET | LIMIT
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { closeBuyWindow } = useContext(GeneralContext);

  const estimatedValue = (stockQuantity * stockPrice).toFixed(2);

  const handleBuyClick = async () => {
    setError("");

    if (stockQuantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (orderType === "LIMIT" && stockPrice <= 0) {
      setError("Please enter a valid price for limit order.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        alert(`✅ Buy order placed for ${stockQuantity} shares of ${uid}`);
        closeBuyWindow();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data || "Order failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action-window" id="buy-window" draggable="true">
      <div className="action-header buy-header">
        <div>
          <h3>{uid} <span className="exchange-tag">NSE</span></h3>
          <p className="header-sub">Regular Order</p>
        </div>
        <button className="close-btn" onClick={closeBuyWindow}>✕</button>
      </div>

      <div className="order-type-tabs">
        <button
          className={orderType === "MARKET" ? "tab-btn active" : "tab-btn"}
          onClick={() => setOrderType("MARKET")}
        >
          Market
        </button>
        <button
          className={orderType === "LIMIT" ? "tab-btn active" : "tab-btn"}
          onClick={() => setOrderType("LIMIT")}
        >
          Limit
        </button>
      </div>

      <div className="action-body">
        {error && <div className="action-error">⚠️ {error}</div>}

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min={1}
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              min={0}
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
              disabled={orderType === "MARKET"}
              placeholder={orderType === "MARKET" ? "Market" : "0.00"}
            />
          </fieldset>
        </div>

        {stockPrice > 0 && (
          <p className="estimated-value">
            Estimated value: <strong>₹{estimatedValue}</strong>
          </p>
        )}
      </div>

      <div className="action-footer">
        <button
          className="btn btn-blue"
          onClick={handleBuyClick}
          disabled={loading}
        >
          {loading ? "Placing..." : `Buy ${uid}`}
        </button>
        <button className="btn btn-grey" onClick={closeBuyWindow}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;