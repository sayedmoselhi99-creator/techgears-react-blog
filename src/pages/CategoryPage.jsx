import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostsByLabel } from "/api/blogger";

export default function CategoryPage() {
  const { label } = useParams();
  const decodedLabel = decodeURIComponent(label); // ✅ Fix space/encoding
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { posts } = await fetchPostsByLabel(decodedLabel);
        setPosts(posts);
      } catch (error) {
        console.error("Error loading category posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [decodedLabel]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600 dark:text-gray-300">
        Loading posts...
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center mt-20 text-gray-600 dark:text-gray-300">
        No posts found in <strong>{decodedLabel}</strong>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
        {decodedLabel}
      </h1>

      {/* 📰 Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/post/${p.url.split("/").pop().replace(".html", "")}`}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {p.images?.[0]?.url && (
              <img
                src={p.images[0].url}
                alt={p.title}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {p.title}
              </h2>
              <span className="text-xs text-gray-500 mt-2 block">
                {new Date(p.published).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
