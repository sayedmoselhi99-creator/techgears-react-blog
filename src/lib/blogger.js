import { supabase } from "./supabase";

/**
 * Fetch all posts ordered by created_at descending
 */
export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, image_url, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data;
}

/**
 * Fetch single post by slug
 */
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data;
}

/**
 * Fetch posts by category
 */
export async function getPostsByCategory(category) {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, image_url, created_at")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data;
}
