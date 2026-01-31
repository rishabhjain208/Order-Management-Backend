const Order = require("../models/Order");

const statuses = ["Preparing", "Out for Delivery", "Delivered"];

const simulateOrderStatus = (orderId, io) => {
  if (!io) {
    console.warn("⚠️ Socket IO not available, skipping real-time updates");
    return;
  }

  let index = 0;

  const interval = setInterval(async () => {
    if (index >= statuses.length) {
      clearInterval(interval);
      return;
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: statuses[index] },
      { new: true }
    );

    // ✅ Safe emit
    io.emit("orderStatusUpdate", {
      orderId: order._id,
      status: order.status,
    });

    index++;
  }, 5000);
};

module.exports = simulateOrderStatus;
