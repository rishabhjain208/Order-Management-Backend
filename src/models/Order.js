const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        quantity: Number,
      },
    ],
    deliveryDetails: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
      default: "Order Received",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
