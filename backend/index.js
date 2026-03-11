require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// ✅ FIX: Allow both frontend ports (login app + dashboard app)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());

// MODELS
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

// AUTH ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ✅ FIX: Auth middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ msg: "No token. Please login first." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

// ---------------- HOLDINGS ----------------
app.get("/allHoldings", authenticateToken, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).send("Error fetching holdings");
  }
});

// ---------------- POSITIONS ----------------
app.get("/allPositions", authenticateToken, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).send("Error fetching positions");
  }
});

// ---------------- NEW ORDER ----------------
app.post("/newOrder", authenticateToken, async (req, res) => {
  try {

    const { name, qty, price, mode } = req.body;

    if (mode === "SELL") {

      const holding = await HoldingsModel.findOne({ name: name });

      if (!holding) {
        return res.status(400).send("Cannot sell. Stock not in holdings.");
      }

      if (holding.qty < qty) {
        return res.status(400).send("Cannot sell. Not enough quantity.");
      }

      holding.qty -= Number(qty);
      await holding.save();
    }

    if (mode === "BUY") {

      let holding = await HoldingsModel.findOne({ name: name });

      if (holding) {
        holding.qty += Number(qty);
        holding.price = price;
        await holding.save();
      } else {

        const newHolding = new HoldingsModel({
          name: name,
          qty: qty,
          avg: price,
          price: price,
          net: "0%",
          day: "0%"
        });

        await newHolding.save();
      }
    }

    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode
    });

    await newOrder.save();

    res.send("Order executed successfully");

  } catch (err) {
    console.log(err);
    res.status(500).send("Order failed");
  }
});

// ---------------- DATABASE ----------------
mongoose.connect(uri)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log("DB connection error:", err);
});