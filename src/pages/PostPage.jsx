import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "/api/blogger";
import { Helmet } from "react-helmet";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostBySlug(slug).then(setPost);
  }, [slug]);

  if (!post) return <p className="text-center p-8">Loading...</p>;

  // --- Generate description (fallback) ---
  const cleanText = post.content.replace(/<[^>]+>/g, ""); // remove HTML tags
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
    image: post.image || "",
    datePublished: post.published,
    dateModified: post.updated,
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

        {/* Correct JSON-LD rendering */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      {/* ---------- PAGE CONTENT ---------- */}
      <article className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-sm">

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
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
