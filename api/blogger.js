// src/api/blogger.js
// ⚡ Optimized Blogger API for React Blog (Vite-compatible)

const API_KEY = "AIzaSyAMT4TjiiFmLeHcZGTe6VLSi9kVOrlVFGg";
const BLOG_ID = "5906335048599841803";
const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}`;
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes cache

// ✅ Normalize paths like /2025/10/my-post.html
function normalizePath(path) {
  if (!path) return "";
  let clean = path.trim();
  if (!clean.startsWith("/")) clean = "/" + clean;
  if (!clean.endsWith(".html")) clean += ".html";
  return clean.replace(/\/+/g, "/");
}

// ✅ Cache helpers
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

// ✅ General fetch wrapper with retry + rate-limit handling
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

// ✅ Fetch all posts (Home page)
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

// ✅ Fetch posts by label (Category page)
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

// ✅ Fetch a single post by its path
export async function fetchPostByPath(path) {
  const normalizedPath = normalizePath(path);
  const cacheKey = `post_${normalizedPath}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const baseUrl = `${BASE_URL}/posts/bypath?key=${API_KEY}&path=${encodeURIComponent(
    normalizedPath
  )}`;

  let data;
  try {
    data = await safeFetch(baseUrl);
  } catch (err) {
    // Handle "not found" fallback to slug search
    if (err.message.includes("404")) {
      console.warn(`Post not found for path: ${normalizedPath}. Searching by slug...`);
      const slug = normalizedPath.split("/").pop().replace(".html", "");
      const searchUrl = `${BASE_URL}/posts/search?q=${slug}&key=${API_KEY}`;
      const searchData = await safeFetch(searchUrl.toString());
      data = searchData.items?.[0] || null;
      if (!data) throw new Error(`Post not found for slug: ${slug}`);
    } else {
      throw err;
    }
  }

  setCache(cacheKey, data);
  return data;
}

// ✅ Fetch post by slug wrapper
export async function fetchPostBySlug(slug) {
  try {
    const path = `/2025/10/${slug}.html`; // Default month fallback
    return await fetchPostByPath(path);
  } catch (error) {
    console.error("❌ Error in fetchPostBySlug:", error);
    throw error;
  }
}

// ✅ Normalize Blogger post data
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
