const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const ProductEnquiry = require("../models/productEnquiry.js");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGOURL || process.env.MONGODB_URI || "mongodb://localhost:27017/attarchand";

async function deleteAllProductEnquiries() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const countBefore = await ProductEnquiry.countDocuments();
    console.log(`\n=== Found ${countBefore} product enquiries ===`);

    if (countBefore === 0) {
      console.log("No product enquiries to delete. Database is already clean.");
      await mongoose.disconnect();
      process.exit(0);
    }

    const result = await ProductEnquiry.deleteMany({});
    console.log(`\n✅ Successfully deleted ${result.deletedCount} product enquiries`);

    const countAfter = await ProductEnquiry.countDocuments();
    console.log(`\n=== Verification: ${countAfter} product enquiries remaining ===`);

    if (countAfter === 0) {
      console.log("✅ All product enquiries have been deleted successfully!");
    } else {
      console.log("⚠️  Warning: Some enquiries may still exist");
    }

    console.log("\n=== Deletion Complete ===");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error deleting product enquiries:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

deleteAllProductEnquiries();
