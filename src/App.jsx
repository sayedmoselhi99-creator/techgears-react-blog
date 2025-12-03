import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AdminPanel from "./lib/admin/admin-panel";
import Login from "./lib/admin/login";
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsConditions "; // removed extra space
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import Contact from "./pages/Contact";
import About from "./pages/About";

import { supabase } from "./lib/supabase";

export default function App() {
  const theme = "light"; // Always light theme
  const [user, setUser] = useState(null);

  // 🔐 Check login state + listen to auth changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header theme={theme} />

        <main className="flex-1">
          <SpeedInsights />

          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostPage />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />

            <Route path="/category/:label" element={<CategoryPage />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* 🔐 Protected Admin Panel */}
            <Route
              path="/admin/*"
              element={user ? <AdminPanel /> : <Navigate to="/login" />}
            />

          </Routes>
        </main>

        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
  );
}
