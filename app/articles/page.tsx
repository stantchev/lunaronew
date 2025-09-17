import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ArticlesClient from "./ArticlesClient";

export const dynamic = "force-static"; // или "force-dynamic"

function getArticles() {
  const articlesDir = path.join(process.cwd(), "content/articles");

  if (!fs.existsSync(articlesDir)) {
    return []; // ако няма папка → празен масив
  }

  const files = fs.readdirSync(articlesDir);

  return files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(articlesDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        author: data.author || "Unknown",
        date: data.date || "",
        category: data.category || "Uncategorized",
        readTime: data.readTime || "",
      };
    });
}

export default function ArticlesPage() {
  const articles = getArticles();
  return <ArticlesClient articles={articles} />;
}