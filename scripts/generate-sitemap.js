import fs from "fs";
import { createClient } from "@supabase/supabase-js";

// --- Supabase config ---
const SUPABASE_URL = "https://idkwiphboefqdefwcvrl.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlka3dpcGhib2VmcWRlZndjdnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDg0NTUsImV4cCI6MjA4MDEyNDQ1NX0.xdNW-gFw2m2vAy0jhCrYHItbZenP9p4sZSwt99S9fuw"; // replace with anon/public key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const siteUrl = "https://techgearsfinds4you.vercel.app";

async function fetchAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, created_at") // use created_at since updated_at doesn't exist
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

async function generateSitemap() {
  try {
    console.log("⏳ Fetching all Supabase posts...");
    const posts = await fetchAllPosts();
    console.log(`✅ Fetched ${posts.length} posts.`);

    const urls = posts
      .map((post) => {
        return `
  <url>
    <loc>${siteUrl}/post/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
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