import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  readTime?: string;
  content: string;
}

const articlesDir = path.join(process.cwd(), "content/articles");

export function getArticles(): Article[] {
  const files = fs.readdirSync(articlesDir);

  const articles: Article[] = files
    .filter((file) => file.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(articlesDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");

      const { data, content } = matter(fileContents);

      return {
        title: data.title as string,
        excerpt: data.excerpt as string,
        author: data.author as string,
        date: data.date as string,
        category: data.category as string,
        slug: filename.replace(/\.mdx$/, ""),
        readTime: data.readTime as string,
        content,
      };
    });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getLatestArticles(limit = 3): Article[] {
  return getArticles().slice(0, limit);
}
