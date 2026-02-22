const mongoose = require("mongoose");

const productEnquirySchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
    productName: { type: String, required: true, default: "Business Enquiry (Floating)" },
    industry: { type: String, default: null },
    clickedAt: { type: Date, default: Date.now },
    source: { type: String, enum: ["product", "floating"], required: true }
  },
  { timestamps: true }
);

productEnquirySchema.index({ productId: 1, clickedAt: -1 });
productEnquirySchema.index({ productName: 1 });
productEnquirySchema.index({ industry: 1 });

module.exports = mongoose.model("ProductEnquiry", productEnquirySchema);
