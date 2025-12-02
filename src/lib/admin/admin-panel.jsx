import React, { useState } from "react";
import { supabase } from "../supabase";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    // generate slug from title
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        content_html: content,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Post saved successfully!");
      setTitle("");
      setContent("");
      setImageUrl("");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border p-2 rounded h-48"
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
          Save Post
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
