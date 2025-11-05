import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "/api/blogger";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostBySlug(slug).then(setPost);
  }, [slug]);

  if (!post) return <p className="text-center p-8">Loading...</p>;

  return (
    <article className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
     {/* <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {post.title}
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {new Date(post.published).toLocaleDateString()}
      </p>*/}

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
  );
}
