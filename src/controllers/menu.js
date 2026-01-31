const MenuItem = require("../models/MenuItem");

/**
 * GET /api/menu
 * Fetch all menu items
 */
exports.getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find();

    if (menu.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: menu
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
      error: error.message
    });
  }
};

/**
 * POST /api/menu
 * Add a new menu item
 */
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price } = req.body;

    // ✅ Validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required"
      });
    }

    // // ✅ Check duplicate
    // const existingItem = await MenuItem.findOne({
    //   name: name.trim()
    // });

    // if (existingItem) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "Menu item already exists"
    //   });
    // }

    const menuItem = await MenuItem.create(req.body);

    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: menuItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add menu item",
      error: error.message
    });
  }
};
