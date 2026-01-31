 const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order");

router.post("/", placeOrder);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
