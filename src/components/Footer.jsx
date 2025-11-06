import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";

export default function Footer({ pages = [] }) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 🔹 Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Tech Gears Finds4You"
                className="h-10 w-auto"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                Tech Gears Finds4You
              </h2>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover budget-friendly gadgets, honest reviews, and smart tech
              that makes life simpler — powered by creativity and curiosity.
            </p>
          </div>

          {/* 🔹 Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate-disclosure"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                 Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                 Disclaimer
                </Link>
              </li>

              {pages.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    {p.title}
                  </Link>
                </li>
                
              ))}
            </ul>
          </div>

          {/* 🔹 Stay Connected */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Stay Connected
            </h3>
            <div className="flex gap-3 mb-4">
              <SocialLink href="https://facebook.com" icon={<Facebook />} />
              <SocialLink href="https://twitter.com" icon={<Twitter />} />
              <SocialLink href="https://instagram.com" icon={<Instagram />} />
              <SocialLink href="https://youtube.com" icon={<Youtube />} />
              <SocialLink href="https://github.com" icon={<Github />} />
            </div>

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Tech Gears Finds4You. All rights reserved.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          Made with ❤️ using React & Tailwind by Tech Gears Finds4You
        </div>
      </div>
    </footer>
  );
}

/* 🔗 Social Icon Button */
function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
