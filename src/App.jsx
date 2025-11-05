import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import { Analytics } from "@vercel/analytics/react"



// individual pages
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsConditions ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import Contact from "./pages/Contact"; 
import About from "./pages/About";

export default function App() {
  // 🌗 Initialize theme from localStorage or default to light
  const theme = "light"; // fixed light theme
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header theme={theme} /> {/* remove setTheme */}

      <main className="flex-1">
        <Routes>
          {/* Home and blog posts */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostPage />} />

          {/* Static pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />}
          />
  
          <Route path="/category/:label" element={<CategoryPage />} />
          

        </Routes>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}
