// scripts/generate-sitemap.js
import fs from "fs"
import path from "path"

// Load environment variables (if using .env)
import dotenv from "dotenv"
dotenv.config()

// Get your site URL from env or fallback
const SITE_URL = process.env.SITE_URL || "https://qodex.co.in"

// List your frontend routes (add more as needed)
const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/login",
  "/register",
  "/privacy-policy",
  "/terms",
  "/problems",
  "/problem",
  "/explore",
  "/contest",
  "/study-plan",
  "/playlist",
  "/profile",
]

// Create sitemap XML content
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map((route) => {
    return `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  })
  .join("")}
</urlset>`

// Define where to save the sitemap
const publicPath = path.resolve("public")
const sitemapPath = path.join(publicPath, "sitemap.xml")

// Ensure /public exists
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}

// Write the sitemap file
fs.writeFileSync(sitemapPath, sitemap, "utf8")
console.log(`✅ Sitemap generated at: ${sitemapPath}`)
