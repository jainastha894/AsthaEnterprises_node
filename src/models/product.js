const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    hsnCode: { type: String, required: true },
    images: { type: [String], default: [] },
    units: { type: Map, of: [String], default: {} },
    featured: { type: Boolean, default: false },
    topRated: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    outofstock: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    signature: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
