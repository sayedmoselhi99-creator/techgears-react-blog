import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { Helmet } from "react-helmet";  // ✅ SEO import

// Correct import
import { fetchPosts } from "/api/blogger";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts(token = "") {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchPosts(token);
      if (!result?.posts) throw new Error("No posts found");

      const { posts: data, nextPageToken: newToken } = result;
      const all = token ? [...posts, ...data] : data;

      const allLabels = new Set();
      all.forEach((p) => p.labels?.forEach((l) => allLabels.add(l)));

      setPosts(all);
      setFiltered(all);
      setNextPageToken(newToken);
    } catch (err) {
      console.error("❌ Failed to load posts:", err);
      setError("Could not load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let list = [...posts];

    if (activeCategory !== "All") {
      list = list.filter((p) => p.labels?.includes(activeCategory));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.content.toLowerCase().includes(term)
      );
    }

    setFiltered(list);
  }, [activeCategory, searchTerm, posts]);

  const featuredPost = filtered[0];

  // -----------------------------------------------------------
  // ⭐ SEO VALUES
  // -----------------------------------------------------------
  const pageTitle = "Tech Gears Finds4You | Latest Tech Reviews & Gadget Guides";
  const pageDescription =
    "Discover the latest tech gadgets, smart home tools, accessories, and expert reviews updated daily at Tech Gears Finds4You.";
  const canonicalUrl = "https://techgearsfinds4you.vercel.app/";

  // JSON-LD (Google Structured Data)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tech Gears Finds4You",
    url: canonicalUrl,
    description: pageDescription,
    sameAs: [
      "https://www.facebook.com/",
      "https://twitter.com/",
      "https://www.instagram.com/",
    ],
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: p.url,
      name: p.title,
    })),
  };

  return (
    <>
      {/* ======================================================
         ⭐ Helmet SEO for HOME PAGE
      ======================================================= */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph (Social Media Preview) */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://techgearsfinds4you.vercel.app/og-image.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(listSchema)}
        </script>
      </Helmet>

      {/* ======================================================
         PAGE CONTENT
      ======================================================= */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-4 gap-10 bg-gray-50 text-gray-800">
        <div className="lg:col-span-3">
          {/* 🌟 Featured Post */}
          {featuredPost && (
            <Link
              to={`/post/${featuredPost.url.split("/").pop().replace(".html", "")}`}
              className="block rounded-2xl overflow-hidden mb-12 group shadow-lg hover:shadow-xl transition"
            >
              <div className="relative">
                {featuredPost.images?.[0]?.url && (
                  <img
                    src={featuredPost.images[0].url}
                    alt={featuredPost.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end">
                  <h2 className="text-3xl md:text-4xl font-bold text-white p-6 drop-shadow-md">
                    {featuredPost.title}
                  </h2>
                </div>
              </div>
            </Link>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h1>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length > 1 ? (
              filtered.slice(1).map((p) => {
                const slug = p.url.split("/").pop().replace(".html", "");
                return (
                  <PostCard
                    key={p.id}
                    title={p.title}
                    thumbnail={p.images?.[0]?.url}
                    date={p.published}
                    slug={slug}
                  />
                );
              })
            ) : (
              !loading &&
              !error && (
                <p className="text-gray-500 text-center col-span-full">
                  No posts found.
                </p>
              )
            )}
          </div>

          {nextPageToken && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => loadPosts(nextPageToken)}
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        <aside>
          <Sidebar onSearch={(val) => setSearchTerm(val)} />
        </aside>
      </div>
    </>
  );
}
