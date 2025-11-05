import React, { useState } from "react";
import { Link } from "react-router-dom";
import pages from "../data/pages";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🌐 Logo + Tagline */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Tech Gears Finds4You"
            className="h-12 w-auto transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              Tech Gears Finds4You
            </h1>
            <p className="text-xs text-gray-500">
              Budget-friendly gadgets & honest reviews
            </p>
          </div>
        </Link>

        {/* 🧭 Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <NavLink to="/">Home</NavLink>
          {pages.slice(0, 6).map((p) => (
            <NavLink key={p.slug} to={`/${p.slug}`}>
              {p.title}
            </NavLink>
          ))}
        </nav>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* 📋 Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
          <nav className="flex flex-col items-start gap-4 p-5 text-sm font-medium text-gray-700">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            {pages.slice(0, 6).map((p) => (
              <NavLink
                key={p.slug}
                to={`/${p.slug}`}
                onClick={() => setMenuOpen(false)}
              >
                {p.title}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* 🔗 Custom NavLink with underline animation */
function NavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative group hover:text-blue-600 transition"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

/* ✨ Optional smooth dropdown animation */
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slideDown {
  animation: slideDown 0.25s ease forwards;
}
`;
document.head.appendChild(style);
