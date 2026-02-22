const express = require("express");

const router = express.Router();

const baseUrl = process.env.BASE_URL || "https://asthaenterprises.com";
const urls = ["/", "/shop", "/about", "/contact", "/privacy", "/terms", "/administrator"];

router.get("/sitemap.xml", (_req, res) => {
  const lastmod = new Date().toISOString().split("T")[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.7"}</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(xml);
});

module.exports = { sitemapRouter: router };
