export function generateSlug(title) {
  return title
    .toString()
    .normalize("NFKD")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
