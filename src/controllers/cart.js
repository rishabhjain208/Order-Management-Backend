const Cart = require("../models/Cart");
const Order = require("../models/Order");
const simulateOrderStatus = require("../utils/orderStatusSimulator");

/**
 * POST /api/cart/add
 * Add item to cart (increase quantity if exists)
 */
exports.addToCart = async (req, res) => {
  try {
    const { menuItemId } = req.body;

    if (!menuItemId) {
      return res.status(400).json({
        success: false,
        message: "Menu item ID is required",
      });
    }

    let cart = await Cart.findOne();

    // Create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        items: [{ menuItem: menuItemId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItem.toString() === menuItemId
      );

      if (itemIndex > -1) {
        // Increase quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ menuItem: menuItemId, quantity: 1 });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};
/**
 * GET /api/cart
 */
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};
exports.checkout = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "Delivery details are required",
      });
    }

    const cart = await Cart.findOne();

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await Order.create({
      items: cart.items,
      deliveryDetails: { name, address, phone },
    });

    // Clear cart after checkout
    cart.items = [];
    await cart.save();

    // Simulate real-time order status
    simulateOrderStatus(order._id, req.io);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Checkout failed",
      error: error.message,
    });
  }
};
