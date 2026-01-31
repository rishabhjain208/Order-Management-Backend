const express = require("express");
const cors = require("cors");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
