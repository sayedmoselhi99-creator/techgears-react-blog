import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      setPost(data);
    }

    loadPost();
  }, [slug]);

  if (!post) return <p className="text-center p-8">Loading...</p>;

  // --- Generate description (fallback) ---
  const cleanText = post.content_html?.replace(/<[^>]+>/g, "") || "";
  const description =
    post.description ||
    cleanText.slice(0, 160) + (cleanText.length > 160 ? "..." : "");

  const canonicalUrl = `https://techgearsfinds4you.vercel.app/post/${slug}`;

  // --- JSON-LD structured data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: description,
    image: post.image_url || "",
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: "Tech Gears Finds4You",
    },
    url: canonicalUrl,
  };

  return (
    <>
      {/* ---------- SEO TAGS ---------- */}
      <Helmet>
        <title>{post.title} | Tech Gears Finds4You</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      {/* ---------- PAGE CONTENT ---------- */}
      <article className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-4 dark:text-white">{post.title}</h1>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        <Link
          to="/"
          className="inline-block mt-8 text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to Home
        </Link>
      </article>
    </>
  );
}
