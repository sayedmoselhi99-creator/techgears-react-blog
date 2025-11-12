// indexing.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { google } from "googleapis";

// --- Load credentials automatically ---
let credentials;

try {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    // ✅ Running on Vercel (or any environment with env var)
    credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    console.log("✅ Loaded credentials from environment variable");
  } else {
    // ✅ Local fallback
    const keyPath = path.resolve("./keys/techgears-indexing-automation-55bd1920c9b5.json");
    if (fs.existsSync(keyPath)) {
      credentials = JSON.parse(fs.readFileSync(keyPath, "utf8"));
      console.log("✅ Loaded credentials from local file");
    } else {
      throw new Error("Key file not found and environment variable not set");
    }
  }
} catch (err) {
  console.error("❌ Failed to load Google credentials:", err.message);
  process.exit(1);
}

// --- Initialize Google Indexing API ---
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});
const indexing = google.indexing({ version: "v3", auth });

// --- Helper: notify Google to index a URL ---
async function notifyGoogle(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: "URL_UPDATED" },
    });
    console.log(`✅ Indexed: ${url}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Error indexing ${url}:`, err.message);
  }
}

// --- Helper: parse sitemap.xml and extract URLs ---
async function parseSitemap(sitemapUrl) {
  console.log(`🌐 Fetching sitemap from: ${sitemapUrl}`);
  const res = await fetch(sitemapUrl);
  const xml = await res.text();

  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  console.log(`✅ Found ${urls.length} URLs in sitemap`);
  return urls;
}

// --- Main execution ---
(async () => {
  const sitemapUrl = "https://techgearsfinds4you.vercel.app/sitemap.xml"; // change if needed
  const urls = await parseSitemap(sitemapUrl);

   for (const url of urls) {
    await notifyGoogle(url);
    await new Promise((r) => setTimeout(r, 2000)); // delay to avoid hitting API rate limits
  }

  console.log("🎉 All URLs have been submitted to Google Indexing API!");
})().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});


