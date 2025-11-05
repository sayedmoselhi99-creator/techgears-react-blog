// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

// Define static routes
const staticRoutes = [
  "/", 
  "/blog",
  "/about",
  "/contact",
];

// --- Fetch dynamic routes from Blogger API ---
async function fetchDynamicRoutes() {
  console.log("Fetching dynamic routes for sitemap generation...");

  const BLOG_ID = "5906335048599841803";
  const API_KEY = "AIzaSyAMT4TjiiFmLeHcZGTe6VLSi9kVOrlVFGg";
  const BLOGGER_DOMAIN = "https://techgearsfinds4you.blogspot.com/";

  const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&fetchBodies=false&maxResults=500`;

  try {
    // ✅ FIX 1: Explicitly import node-fetch for build environment
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Blogger API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // ✅ FIX 2: Safely extract URLs from Blogger data
    const routes = (data.items || [])
      .map(post => {
        if (post.url && post.url.startsWith(BLOGGER_DOMAIN)) {
          // Return relative path (e.g., `/2025/11/my-post.html`)
          return "/" + post.url.substring(BLOGGER_DOMAIN.length);
        }
        return null;
      })
      .filter(Boolean);

    console.log(`Fetched ${routes.length} dynamic Blogger routes.`);
    return routes;
  } catch (error) {
    console.error("❌ Failed to fetch Blogger posts:", error);
    return [];
  }
}

// --- Async config ---
export default defineConfig(async ({ command }) => {
  // ✅ FIX 3: Always await fetch inside defineConfig
  const dynamicRoutes = command === "build" ? await fetchDynamicRoutes() : [];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  console.log(`Sitemap will include ${allRoutes.length} total routes.`);

  return {
    plugins: [
      react(),
      Sitemap({
        hostname: "https://techgearsfinds4you.vercel.app",
        dynamicRoutes: allRoutes,
        changefreq: "weekly",
        priority: 0.7,
        generateRobotsTxt: true,
      }),
    ],
    build: {
      outDir: "dist",
    },
  };
});
