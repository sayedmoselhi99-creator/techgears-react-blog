// api/posts.js
import fetch from "node-fetch";

let cache = {
  data: null,
  time: 0,
  nextPage: null,
};

const BLOG_ID = "5906335048599841803";
const API_KEY = "AIzaSyAMT4TjiiFmLeHcZGTe6VLSi9kVOrlVFGg";

export default async function handler(req, res) {
  try {
    const now = Date.now();
    const pageToken = req.query.pageToken || "";
    const isCacheValid = cache.data && now - cache.time < 5 * 60 * 1000; // 5 mins

    // Serve from cache
    if (isCacheValid && !pageToken) {
      console.log("🧠 Serving from cache");
      return res.status(200).json(cache.data);
    }

    // Build API URL with fields optimization
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=6&fields=items(id,title,url,images,content),nextPageToken${
      pageToken ? `&pageToken=${pageToken}` : ""
    }`;

    console.log("🌍 Fetching from Blogger API:", url);
    const response = await fetch(url);
    const data = await response.json();

    // Cache only main page (not paginated)
    if (!pageToken) {
      cache = {
        data,
        time: now,
        nextPage: data.nextPageToken || null,
      };
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ error: "Failed to fetch Blogger posts" });
  }
}
