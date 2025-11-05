import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ title, thumbnail, date, slug }) {
  return (
    <Link
      to={`/post/${slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* 🖼️ Image */}
      <div className="overflow-hidden relative">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* 🧾 Card Body */}
      <div className="p-5">
        {/* 🗓️ Date */}
        <p className="text-sm text-gray-500 mb-2">
          {new Date(date).toLocaleDateString()}
        </p>

        {/* 📰 Title */}
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h2>
      </div>
    </Link>
  );
}
