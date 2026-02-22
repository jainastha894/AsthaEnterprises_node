const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true, enum: ['home', 'about', 'contact', 'shop'] },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SEO", seoSchema);
