const mongoose = require("mongoose");
const ItemModel = require("../models/itemsModel");

const getItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getItem = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    const item = await ItemModel.findById(_id);
    res.status(200).json(item);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new ItemModel(item);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

module.exports = { getItems, createItem, getItem };
