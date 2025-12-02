import { useParams } from "react-router-dom";
import matter from "gray-matter";
import { marked } from "marked";

export default function Post() {
  const { slug } = useParams();

  const post = import.meta.glob("../posts/*.md", { as: "raw", eager: true });
  const file = Object.entries(post).find(([path]) =>
    path.includes(slug)
  );

  if (!file) return <h1>Post not found</h1>;

  const { data, content } = matter(file[1]);
  const html = marked(content);

  document.title = data.title;

  return (
    <article className="prose max-w-3xl mx-auto p-6">
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
