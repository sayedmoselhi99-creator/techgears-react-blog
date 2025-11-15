// src/api/blogger.js
// ⚡ Optimized Blogger API for React Blog (Vite-compatible)

const API_KEY = "AIzaSyAMT4TjiiFmLeHcZGTe6VLSi9kVOrlVFGg";
const BLOG_ID = "5906335048599841803";
const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}`;
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes cache

// ------------------------------------------------------------
// ✅ Normalize paths like /2025/10/my-post.html
// ------------------------------------------------------------
function normalizePath(path) {
  if (!path) return "";
  let clean = path.trim();
  if (!clean.startsWith("/")) clean = "/" + clean;
  if (!clean.endsWith(".html")) clean += ".html";
  return clean.replace(/\/+/g, "/");
}

// ------------------------------------------------------------
// ✅ Cache helpers
// ------------------------------------------------------------
function getCache(key) {
  try {
    const data = localStorage.getItem(key);
    const time = localStorage.getItem(`${key}_time`);
    if (data && time && Date.now() - parseInt(time) < CACHE_TTL) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Cache read failed:", e);
  }
  return null;
}

function setCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(`${key}_time`, Date.now().toString());
  } catch (e) {
    console.warn("Cache write failed:", e);
  }
}

// ------------------------------------------------------------
// ✅ Safe fetch with retry + rate-limit handling
// ------------------------------------------------------------
async function safeFetch(url, retries = 2, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url);

    if (res.status === 429 && i < retries) {
      console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return await res.json();
  }
}

// ------------------------------------------------------------
// ✅ Fetch posts for Home page
// ------------------------------------------------------------
export async function fetchPosts(pageToken = "") {
  const cacheKey = `posts_${pageToken || "first"}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = new URL(`${BASE_URL}/posts`);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("fetchImages", "true");
  url.searchParams.append("maxResults", "9");
  url.searchParams.append(
    "fields",
    "items(id,title,content,url,images,labels,published),nextPageToken"
  );
  if (pageToken) url.searchParams.append("pageToken", pageToken);

  const data = await safeFetch(url.toString());
  const result = { posts: data.items || [], nextPageToken: data.nextPageToken || null };

  setCache(cacheKey, result);
  return result;
}

// ------------------------------------------------------------
// ✅ Fetch posts by label (Category page)
// ------------------------------------------------------------
export async function fetchPostsByLabel(label, pageToken = "") {
  const cacheKey = `label_${label}_${pageToken || "first"}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = new URL(`${BASE_URL}/posts`);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("fetchImages", "true");
  url.searchParams.append("maxResults", "9");
  url.searchParams.append("labels", label);
  url.searchParams.append(
    "fields",
    "items(id,title,content,url,images,labels,published),nextPageToken"
  );
  if (pageToken) url.searchParams.append("pageToken", pageToken);

  const data = await safeFetch(url.toString());
  const result = { posts: data.items || [], nextPageToken: data.nextPageToken || null };

  setCache(cacheKey, result);
  return result;
}

// ------------------------------------------------------------
// ✅ Fetch a post by path (used internally by slug function)
// ------------------------------------------------------------
export async function fetchPostByPath(path) {
  const normalizedPath = normalizePath(path);
  const cacheKey = `post_${normalizedPath}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `${BASE_URL}/posts/bypath?key=${API_KEY}&path=${encodeURIComponent(
    normalizedPath
  )}`;

  let data;

  try {
    data = await safeFetch(url);
  } catch (err) {
    if (err.message.includes("404")) {
      console.warn(`404 for path ${normalizedPath}`);
      throw err; // handled by slug-fallback
    }
    throw err;
  }

  setCache(cacheKey, data);
  return data;
}

// ------------------------------------------------------------
// ⭐ ⭐ ⭐  FIXED VERSION — Fetch post by slug (never breaks)
// ------------------------------------------------------------
export async function fetchPostBySlug(slug) {
  // ------------------------------------------------------------
  // 1) Try label: slug:my-slug
  // ------------------------------------------------------------
  const labelUrl = `${BASE_URL}/posts?labels=slug:${slug}&key=${API_KEY}`;

  try {
    const labelData = await safeFetch(labelUrl);
    if (labelData.items && labelData.items.length > 0) {
      return labelData.items[0];
    }
  } catch {}

  // ------------------------------------------------------------
  // 2) Try Blogger Search (most reliable fallback)
  // ------------------------------------------------------------
  const searchUrl = `${BASE_URL}/posts/search?q=${slug}&key=${API_KEY}`;

  try {
    const searchData = await safeFetch(searchUrl);
    if (searchData.items && searchData.items.length > 0) {
      return searchData.items[0];
    }
  } catch {}

  // ------------------------------------------------------------
  // 3) Try scanning likely Blogger URL paths (YYYY/MM/slug.html)
  // ------------------------------------------------------------
  const years = ["2023", "2024", "2025", "2026"];
  const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

  for (const year of years) {
    for (const month of months) {
      const path = `/${year}/${month}/${slug}.html`;

      try {
        const post = await fetchPostByPath(path);
        if (post && post.id) return post;
      } catch {
        continue;
      }
    }
  }

  // ------------------------------------------------------------
  // ❌ Still nothing found?
  // ------------------------------------------------------------
  throw new Error(`Post not found for slug: ${slug}`);
}

// ------------------------------------------------------------
// ✅ Post normalization
// ------------------------------------------------------------
export function normalizePosts(rawPosts = []) {
  return rawPosts.map((p) => {
    const title =
      p.title?.trim() ||
      p.title?.$t ||
      p.url?.split("/").pop().replace(".html", "").replace(/-/g, " ") ||
      "Untitled Post";

    const image =
      p.images?.[0]?.url ||
      p.featuredImage ||
      p.content?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
      "";

    const date = p.published || p.updated || null;

    return {
      id: p.id,
      title,
      image,
      date,
      url: p.url,
      published: date,
    };
  });
}
