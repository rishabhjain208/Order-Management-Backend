const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  checkout,
} = require("../controllers/cart");

router.post("/add", addToCart);
router.get("/", getCart);
router.post("/checkout", checkout);

module.exports = router;
