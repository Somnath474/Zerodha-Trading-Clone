const authMiddleware = require("../middleware/authMiddleware");

app.post("/newOrder", authMiddleware, async (req, res) => {

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