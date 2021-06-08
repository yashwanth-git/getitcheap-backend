const express = require("express");
const { getItems, createItem, getItem } = require("../controllers/items");
const router = express.Router();

//Import auth middleware
const auth = require("../middleware/auth");

router.get("/", getItems);
router.post("/", auth, createItem);
router.get("/:id", getItem);

module.exports = router;
