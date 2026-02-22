const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const Units = require("../models/units.js");
const SEO = require("../models/seo.js");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/attarchand";

async function migrateData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    console.log("\n=== Migrating Units Data ===");
    const unitsPath = path.join(process.cwd(), "src/config/units.json");
    if (fs.existsSync(unitsPath)) {
      const unitsData = JSON.parse(fs.readFileSync(unitsPath, "utf-8"));
      let units = await Units.findOne();
      if (units) {
        console.log("Units data already exists, updating...");
        Object.keys(unitsData).forEach(key => { units[key] = unitsData[key]; });
        await units.save();
        console.log("Units data updated successfully");
      } else {
        units = new Units(unitsData);
        await units.save();
        console.log("Units data migrated successfully");
      }
      console.log("Units data:", units);
    } else {
      console.log("Units JSON file not found, creating default...");
      const units = await Units.getUnits();
      console.log("Default units created:", units);
    }

    console.log("\n=== Migrating SEO Data ===");
    const seoPath = path.join(process.cwd(), "src/config/seo.json");
    if (fs.existsSync(seoPath)) {
      const seoData = JSON.parse(fs.readFileSync(seoPath, "utf-8"));
      for (const [page, data] of Object.entries(seoData)) {
        const existingSEO = await SEO.findOne({ page });
        if (existingSEO) {
          console.log(`SEO data for ${page} already exists, updating...`);
          existingSEO.data = data;
          await existingSEO.save();
          console.log(`SEO data for ${page} updated successfully`);
        } else {
          const seo = new SEO({ page, data });
          await seo.save();
          console.log(`SEO data for ${page} migrated successfully`);
        }
      }
    } else {
      console.log("SEO JSON file not found");
    }

    console.log("\n=== Migration Complete ===");
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

migrateData();
