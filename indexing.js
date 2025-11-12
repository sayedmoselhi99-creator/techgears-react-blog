import { google } from "googleapis";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import path from "path";

// ✅ CONFIGURATION
const SITEMAP_URL = "https://techgearsfinds4you.vercel.app/sitemap.xml";
const KEY_PATH = path.resolve("D:/keys/techgears-indexing-automation-55bd1920c9b5.json");

// ----------------------------------------------

async function authenticate() {
  try {
    if (!fs.existsSync(KEY_PATH)) {
      throw new Error(`Key file not found: ${KEY_PATH}`);
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_PATH,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const client = await auth.getClient();
    console.log("✅ Authenticated with Google Indexing API.");
    return client;
  } catch (err) {
    console.error("❌ Authentication failed:", err.message);
    process.exit(1);
  }
}

async function getUrlsFromSitemap(url) {
  try {
    console.log(`📥 Fetching sitemap from: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.statusText}`);

    const xml = await res.text();
    const data = await parseStringPromise(xml);

    const urls = [];
    if (data.urlset && data.urlset.url) {
      for (const u of data.urlset.url) {
        if (u.loc && u.loc[0]) urls.push(u.loc[0]);
      }
    } else if (data.sitemapindex && data.sitemapindex.sitemap) {
      // Handle sitemap index (multiple sitemaps)
      for (const s of data.sitemapindex.sitemap) {
        if (s.loc && s.loc[0]) {
          const subUrls = await getUrlsFromSitemap(s.loc[0]);
          urls.push(...subUrls);
        }
      }
    }

    console.log(`🗂️ Found ${urls.length} URLs in sitemap.`);
    return urls;
  } catch (err) {
    console.error("❌ Failed to parse sitemap:", err.message);
    return [];
  }
}

async function requestIndexing(client, url) {
  try {
    const indexing = google.indexing({ version: "v3", auth: client });

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED", // or "URL_DELETED" if needed
      },
    });

    console.log(`📤 Submitted: ${url}`);
    if (res.data.urlNotificationMetadata) {
      console.log(`🕓 Status: ${res.data.urlNotificationMetadata.latestUpdate?.type || "Success"}`);
    }
  } catch (err) {
    console.error(`❌ Failed to submit ${url}:`, err.message);
  }
}

(async () => {
  const client = await authenticate();
  const urls = await getUrlsFromSitemap(SITEMAP_URL);

  if (urls.length === 0) {
    console.error("⚠️ No URLs found in sitemap. Exiting.");
    return;
  }

  for (const url of urls) {
    await requestIndexing(client, url);
    await new Promise((r) => setTimeout(r, 2000)); // Wait 2s between requests
  }

  console.log("🎉 All sitemap URLs submitted for indexing!");
})();
