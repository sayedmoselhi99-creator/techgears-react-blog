import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // --- Load all posts ---
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error(err);
      setStatus("Failed to load posts");
    }
  }

  // --- Handle Add / Update ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required");

    setStatus("Saving...");

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    try {
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from("posts")
          .update({ title, slug, content_html: content, image_url: imageUrl })
          .eq("id", editingPost.id);
        if (error) throw error;
        setStatus("Post updated successfully!");
      } else {
        // Create new post
        const { error } = await supabase.from("posts").insert([
          {
            title,
            slug,
            content_html: content,
            image_url: imageUrl,
          },
        ]);
        if (error) throw error;
        setStatus("Post saved successfully!");
      }

      // Reset form
      setTitle("");
      setContent("");
      setImageUrl("");
      setEditingPost(null);

      loadPosts();
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  // --- Handle Edit ---
  function handleEdit(post) {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content_html);
    setImageUrl(post.image_url);
  }

  // --- Handle Delete ---
  async function handleDelete(postId) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
      setStatus("Post deleted successfully!");
      loadPosts();
    } catch (err) {
      console.error(err);
      setStatus("Error deleting post");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {editingPost ? "Edit Post" : "Create New Post"}
      </h1>

      {/* --- Post Form --- */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Content (HTML)</label>
          <textarea
            className="w-full border p-2 rounded h-48 font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingPost ? "Update Post" : "Save Post"}
        </button>
        {editingPost && (
          <button
            type="button"
            className="ml-3 px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => {
              setEditingPost(null);
              setTitle("");
              setContent("");
              setImageUrl("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {status && <p className="mb-4">{status}</p>}

      {/* --- Posts List --- */}
      <h2 className="text-xl font-bold mb-3">All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-center p-4 border rounded bg-white"
          >
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => alert(post.content_html)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
