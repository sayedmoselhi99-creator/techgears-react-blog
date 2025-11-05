import fs from "fs";
import fetch from "node-fetch";

const API_KEY = "AIzaSyAMT4TjiiFmLeHcZGTe6VLSi9kVOrlVFGg";
const BLOG_ID = "5906335048599841803";
const siteUrl = "https://techgearsfinds4you.vercel.app";

async function fetchAllPosts() {
  let posts = [];
  let nextPageToken = "";
  do {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=100${
      nextPageToken ? `&pageToken=${nextPageToken}` : ""
    }`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Blogger posts: ${res.status}`);
    const data = await res.json();
    posts = posts.concat(data.items || []);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  return posts;
}

async function generateSitemap() {
  try {
    console.log("⏳ Fetching all Blogger posts...");
    const posts = await fetchAllPosts();

    console.log(`✅ Fetched ${posts.length} total posts.`);

    const urls = posts
      .map((post) => {
        const slug = post.url.split("/").pop().replace(".html", "");
        return `
  <url>
    <loc>${siteUrl}/post/${slug}</loc>
    <lastmod>${new Date(post.updated).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

    // Ensure /dist folder exists
    if (!fs.existsSync("./dist")) fs.mkdirSync("./dist");

    fs.writeFileSync("./dist/sitemap.xml", xml);
    console.log("🎉 Sitemap generated successfully at dist/sitemap.xml!");
  } catch (err) {
    console.error("❌ Failed to generate sitemap:", err);
  }
}

generateSitemap();
