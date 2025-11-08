import { google } from "googleapis";
import fs from "fs";

// Load your service account key file
const KEY_FILE = "./service-account.json"; // path to the JSON key you downloaded
const SCOPES = ["https://www.googleapis.com/auth/indexing"];

async function notifyGoogle(url) {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const indexing = google.indexing({ version: "v3", auth: client });

  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED",
      },
    });
    console.log(`✅ Indexed: ${url}`);
    console.log(res.data);
  } catch (err) {
    console.error(`❌ Error indexing ${url}:`, err);
  }
}

// Example: Add your blog URLs here or pull from Blogger API
const urls = [
  "https://techgearsfinds4you.vercel.app/",
  "https://techgearsfinds4you.vercel.app/post/top-10-travel-outdoor-tech-anker-2025",
];

urls.forEach((url) => notifyGoogle(url));
