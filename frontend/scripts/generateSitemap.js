// scripts/generate-sitemap.js
import fs from "fs"
import { Readable } from "stream"
import { SitemapStream, streamToPromise } from "sitemap"

const hostname = process.env.SITE_URL || "https://qodex.co.in"
const staticRoutes = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/problems",
  "/problem",
  "/explore",
  "/contest",
  "/study-plan",
  "/playlist",
  "/profile",
  "/login",
  "/signup",
  // Add any other static pages here
]

async function generate() {
  const links = staticRoutes.map((path) => ({
    url: path,
    changefreq: "weekly",
    priority: 0.8,
    lastmod: new Date().toISOString(),
  }))

  const stream = new SitemapStream({ hostname })
  const xmlData = await streamToPromise(Readable.from(links).pipe(stream))

  // Ensure 'public' folder exists
  if (!fs.existsSync("./public")) fs.mkdirSync("./public")
  fs.writeFileSync("./public/sitemap.xml", xmlData.toString())

  console.log(`✅ sitemap.xml generated with ${links.length} URLs`)
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
