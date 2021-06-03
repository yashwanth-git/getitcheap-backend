const express = require("express");
const { getItems, createItem, getItem } = require("../controllers/items");
const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.get("/:id", getItem);

module.exports = router;
