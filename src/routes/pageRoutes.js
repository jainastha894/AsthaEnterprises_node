const express = require("express");
const {
  renderHome, renderAbout, renderContact, renderShop,
  renderPrivacy, renderTerms, submitContactForm, trackProductEnquiry
} = require("../controllers/pageController.js");
const { getAllProducts } = require("../controllers/productController.js");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Route to serve images with proper headers for WhatsApp compatibility
router.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "public", "uploads", filename);
  if (!fs.existsSync(filePath)) {
    const defaultPath = path.join(__dirname, "..", "public", "uploads", "default.png");
    if (fs.existsSync(defaultPath)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000");
      return res.sendFile(defaultPath);
    }
    return res.status(404).send("Image not found");
  }
  const ext = path.extname(filename).toLowerCase();
  const contentTypeMap = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
    ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml"
  };
  const contentType = contentTypeMap[ext] || "image/jpeg";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(filePath);
});

router.get("/", renderHome);
router.get("/about", renderAbout);
router.get("/contact", renderContact);
router.post("/contact", submitContactForm);
router.post("/api/track-enquiry", trackProductEnquiry);
router.get("/shop", renderShop);
router.get("/privacy", renderPrivacy);
router.get("/terms", renderTerms);

module.exports = router;
