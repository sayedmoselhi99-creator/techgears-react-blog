// src/api/blogger.js
const API_KEY = "AIzaSyAMT4TjiiFmLeHcZGTe6VLSi9kVOrlVFGg";
const BLOG_ID = "5906335048599841803";

function normalizePath(path) {
  if (!path) return "";
  let clean = path.trim();
  if (!clean.startsWith("/")) clean = "/" + clean;
  if (!clean.endsWith(".html")) clean += ".html";
  return clean.replace(/\/+/g, "/");
}

// ✅ Fetch all posts (used in Home.jsx)
export async function fetchPosts(pageToken = "") {
  const url = new URL(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("fetchImages", "true");
  url.searchParams.append("maxResults", "9");
  if (pageToken) url.searchParams.append("pageToken", pageToken);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  const data = await res.json();

  return { posts: data.items || [], nextPageToken: data.nextPageToken || null };
}

// ✅ Fetch posts by label (used in CategoryPage.jsx)
export async function fetchPostsByLabel(label, pageToken = "") {
  const url = new URL(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("fetchImages", "true");
  url.searchParams.append("maxResults", "9");
  url.searchParams.append("labels", label);
  if (pageToken) url.searchParams.append("pageToken", pageToken);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch posts by label: ${res.status}`);
  const data = await res.json();

  return { posts: data.items || [], nextPageToken: data.nextPageToken || null };
}

// ✅ Helper: Delay to avoid hitting 429 errors
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ✅ Fetch post by path or fallback to slug search
export async function fetchPostByPath(path) {
  const normalizedPath = normalizePath(path);

  // Try original path first
  const baseUrl = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/bypath?key=${API_KEY}&path=${encodeURIComponent(normalizedPath)}`;
  let res = await fetch(baseUrl);

  if (res.status === 429) {
    console.warn("⚠️ Rate limit hit, waiting 1s...");
    await sleep(1000);
    res = await fetch(baseUrl);
  }

  if (res.status === 404) {
    console.warn(`⚠️ Post not found for path: ${normalizedPath}. Trying search by slug...`);
    const slug = normalizedPath.split("/").pop().replace(".html", "");
    const searchUrl = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/search?q=${slug}&key=${API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData.items && searchData.items.length > 0) {
      console.log(`✅ Found post by search: ${slug}`);
      return searchData.items[0];
    } else {
      throw new Error(`Post not found for slug: ${slug}`);
    }
  }

  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  return await res.json();
}

// ✅ Wrapper for your PostPage.jsx
export async function fetchPostBySlug(slug) {
  try {
    const path = `/2025/10/${slug}.html`; // Default month fallback
    return await fetchPostByPath(path);
  } catch (error) {
    console.error("❌ Error in fetchPostBySlug:", error);
    throw error;
  }
  }
  // ✅ Normalize Blogger API post structure
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

