const Order = require("../models/Order");

/**
 * POST /api/orders
 * Place a new order
 */
exports.placeOrder = async (req, res) => {
  try {
    const { items, deliveryDetails } = req.body;

    // ✅ Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required"
      });
    }

    if (
      !deliveryDetails?.name ||
      !deliveryDetails?.address ||
      !deliveryDetails?.phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivery details are incomplete"
      });
    }

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to place order",
      error: error.message
    });
  }
};



/**
 * GET /api/orders/:id
 * Track order status
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid order ID",
      error: error.message
    });
  }
};
/**
 * PATCH /api/orders/:id/status
 * Update order status manually
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Order Received",
      "Preparing",
      "Out for Delivery",
      "Delivered"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
};
