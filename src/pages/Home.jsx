import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

// ✅ Correct import for your Blogger API
import { fetchPosts } from "/api/blogger";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // ✅ Added error state

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
      //setCategories(["All", ...Array.from(allLabels)]);//
      setNextPageToken(newToken);
    } catch (err) {
      console.error("❌ Failed to load posts:", err);
      setError("Could not load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Apply filtering logic
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-4 gap-10 bg-gray-50 text-gray-800">
      {/* ===== Main Content ===== */}
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

        {/* 📰 Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Latest Posts
        </h1>

        {/* ⚠️ Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* 🏷️ Categories */}
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

        {/* 📰 Posts Grid */}
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

        {/* 🧭 Load More */}
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

      {/* ===== Sidebar ===== */}
      <aside>
        <Sidebar onSearch={(val) => setSearchTerm(val)} />
      </aside>
    </div>
  );
}
