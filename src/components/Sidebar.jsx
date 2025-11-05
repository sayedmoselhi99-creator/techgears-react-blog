import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "/api/blogger";

export default function Sidebar({ onSearch }) {
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSidebarData();
  }, []);

  async function loadSidebarData() {
    try {
      const { posts } = await fetchPosts();

      // 📰 Recent posts (limit to 5)
      setRecentPosts(posts.slice(0, 5));

      // 🏷️ Extract unique categories
      const allLabels = new Set();
      posts.forEach((p) => p.labels?.forEach((l) => allLabels.add(l)));
      setCategories(Array.from(allLabels));
    } catch (error) {
      console.error("Sidebar data failed:", error);
    }
  }

  // 🔍 Handle search — updates both local input and parent (Home.jsx)
  function handleSearch(e) {
    const value = e.target.value;
    setSearchTerm(value);

    // ✅ Trigger parent filtering immediately
    if (onSearch && typeof onSearch === "function") {
      onSearch(value);
    }
  }

  return (
    <aside className="w-full md:w-80 space-y-8">
      {/* 🔍 Search Box */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          🔍 Search
        </h3>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition"
        />
      </div>

      {/* 📰 Recent Posts */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📰 Recent Posts
        </h3>
        <ul className="space-y-3">
          {recentPosts.map((p) => (
            <li key={p.id}>
              <Link
                to={`/post/${p.url.split("/").pop().replace(".html", "")}`}
                className="text-sm text-gray-700 hover:text-blue-600 transition"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🏷️ Categories */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🏷️ Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 bg-gray-50 hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
