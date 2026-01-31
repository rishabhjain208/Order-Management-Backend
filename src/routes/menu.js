const express = require("express");
const router = express.Router();
const {
  getMenu,
  addMenuItem,
} = require("../controllers/menu");

router.get("/", getMenu);
router.post("/", addMenuItem); // admin use

module.exports = router;
