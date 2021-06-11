const express = require("express");
const {
  getItems,
  createItem,
  getItem,
  getUserItems,
} = require("../controllers/items");
const router = express.Router();

//Import auth middleware
const auth = require("../middleware/auth");

router.get("/", getItems);
router.post("/", auth, createItem);
router.get("/:id", getItem);
router.get("/:id/user-items", auth, getUserItems);

module.exports = router;
