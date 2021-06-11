const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  itemName: { type: String, required: true },
  option: { type: String, required: true },
  cost: { type: String, required: true },
  model: { type: String, required: true },
  desc: { type: String, required: true },
  tags: { type: [String], default: [] },
  files: { type: [String], default: [] },
  name: String,
  creator: { type: String, required: true },
  userName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ItemModel = mongoose.model("itemSchema", itemSchema);

module.exports = ItemModel;
