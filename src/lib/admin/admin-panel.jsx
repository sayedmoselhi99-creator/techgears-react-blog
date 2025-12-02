// src/lib/admin/admin-panel.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

/* ---------- Helpers ---------- */
// SEO-friendly slug generator
function generateSlug(title) {
  return title
    .toString()
    .normalize("NFKD")
    .replace(/[\u2013\u2014]/g, "-") // en/em dash -> -
    .replace(/&/g, " and ") // & -> and
    .replace(/[^a-zA-Z0-9\s-]/g, "") // remove special chars
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// small safe HTML escape for titles in modals (not for content)
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- Component ---------- */
export default function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // form state
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // view modal
  const [viewPost, setViewPost] = useState(null);

  // pagination (optional simple)
  const [pageSize] = useState(20);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(pageSize);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  // create or update
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setError("");

    if (!title.trim() || !contentHtml.trim()) {
      setError("Title and content are required.");
      return;
    }

    const slug = generateSlug(title);

    try {
      if (editingPost) {
        // update
        const payload = {
          title: title.trim(),
          slug,
          content_html: contentHtml,
          image_url: imageUrl || null,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", editingPost.id);

        if (error) throw error;
        setStatus("Post updated.");
      } else {
        // insert
        const payload = {
          title: title.trim(),
          slug,
          content_html: contentHtml,
          image_url: imageUrl || null,
        };

        const { error } = await supabase.from("posts").insert([payload]);
        if (error) throw error;
        setStatus("Post created.");
      }

      // reset
      resetForm();
      await loadPosts();
    } catch (err) {
      console.error(err);
      setError(err.message || "Save failed");
    }
  }

  function handleEdit(post) {
    setEditingPost(post);
    setTitle(post.title || "");
    setContentHtml(post.content_html || "");
    setImageUrl(post.image_url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingPost(null);
    setTitle("");
    setContentHtml("");
    setImageUrl("");
  }

  async function handleDelete(id) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setStatus("");
    setError("");
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      setStatus("Post deleted.");
      loadPosts();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  }

  // View in modal
  function handleView(post) {
    setViewPost(post);
  }
  function closeView() {
    setViewPost(null);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{editingPost ? "Edit Post" : "Create New Post"}</h1>

      {/* status */}
      {status && <div className="mb-4 text-green-700 bg-green-50 p-2 rounded">{status}</div>}
      {error && <div className="mb-4 text-red-700 bg-red-50 p-2 rounded">{error}</div>}

      {/* form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-5 rounded shadow">
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Post title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Image URL (cover)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="https://..."
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Content (raw HTML)</label>
          <textarea
            value={contentHtml}
            onChange={(e) => setContentHtml(e.target.value)}
            rows={12}
            className="w-full border p-2 rounded font-mono"
            placeholder="<p>Your HTML here...</p>"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {editingPost ? "Update Post" : "Create Post"}
          </button>

          {editingPost && (
            <button
              type="button"
              className="px-3 py-2 bg-gray-300 rounded"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            className="px-3 py-2 bg-gray-100 rounded"
            onClick={() => {
              // preview toggles view modal for current unsaved content
              handleView({
                title: title || "(untitled)",
                content_html: contentHtml || "",
                image_url: imageUrl || null,
                created_at: new Date().toISOString(),
              });
            }}
          >
            Live preview
          </button>
        </div>
      </form>

      {/* posts list */}
      <h2 className="text-xl font-semibold mb-3">All posts</h2>

      {loading ? (
        <p>Loading posts…</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex justify-between items-start gap-4 p-4 border rounded bg-white">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {p.image_url ? (
                    // small thumbnail
                    // using img (keep small)
                    <img src={p.image_url} alt={p.title} className="w-20 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-20 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No image</div>
                  )}
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.slug}</div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  Created: {new Date(p.created_at).toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                <button onClick={() => handleView(p)} className="px-3 py-1 bg-blue-600 text-white rounded">View</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View modal (simple) */}
      {viewPost && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40">
          <div className="w-full max-w-3xl bg-white rounded shadow-lg overflow-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{escapeHtml(viewPost.title)}</h3>
              <div className="flex gap-2">
                <a
                  href={`/post/${viewPost.slug || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Open live
                </a>
                <button onClick={closeView} className="px-3 py-1 bg-gray-300 rounded">Close</button>
              </div>
            </div>

            <div className="p-4">
              {viewPost.image_url && (
                <img src={viewPost.image_url} alt={viewPost.title} className="w-full h-56 object-cover rounded mb-4" />
              )}

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: viewPost.content_html }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
