const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  strain: { type: String, required: true },
  potency: { type: String, required: true },
  labResults: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);
