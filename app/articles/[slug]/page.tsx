import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CustomMDX from "@/components/mdx";
import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { generateMetadata as generateSEOMetadata, generateJSONLD, generateBreadcrumbJSONLD } from "@/lib/seo";

const articlesDir = path.join(process.cwd(), "content/articles");

// ---- Static Params ----
export async function generateStaticParams() {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

// ---- Metadata ----
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const filePath = path.join(articlesDir, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Article Not Found | Lunaro",
      description: "This article does not exist.",
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContents);

  return generateSEOMetadata({
    title: data.title,
    description: data.excerpt || data.description || "",
    keywords: data.keywords || [
      "AI news",
      "cybersecurity news", 
      "technology innovation",
      "Lunaro",
    ],
    author: data.author || "Lunaro",
    publishedTime: data.date || new Date().toISOString(),
    section: data.category || "News",
    tags: data.tags || [],
    url: `https://lunaro.news/articles/${params.slug}`,
    type: "article"
  });
}

// ---- Page Component ----
export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const filePath = path.join(articlesDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  // Generate JSON-LD structured data
  const articleJSONLD = generateJSONLD({
    title: data.title,
    description: data.excerpt || data.description || "",
    author: data.author || "Lunaro",
    publishedTime: data.date || new Date().toISOString(),
    section: data.category || "News",
    url: `https://lunaro.news/articles/${slug}`,
    content,
    type: "article"
  });

  // Generate breadcrumb JSON-LD
  const breadcrumbJSONLD = generateBreadcrumbJSONLD([
    { name: "Home", url: "https://lunaro.news" },
    { name: "Articles", url: "https://lunaro.news/articles" },
    { name: data.title, url: `https://lunaro.news/articles/${slug}` }
  ]);

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* Article Header */}
      <article className="relative">
        <div className="container-custom py-12">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/articles"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Articles
            </Link>
          </div>

          {/* Article Meta */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 text-sm font-medium rounded-full border border-blue-500/30">
                {data.category || "General"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight futuristic-text">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-12 pb-8 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span className="font-medium">{data.author || "Unknown"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>
                  {data.date
                    ? new Date(data.date).toLocaleDateString("en-US")
                    : "N/A"}
                </span>
              </div>
              {data.readTime && (
                <div className="flex items-center space-x-2">
                  <Clock size={18} />
                  <span>{data.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="relative">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none prose-invert glass-card p-8 rounded-xl">
              <CustomMDX source={content} />
            </article>

            <div className="mt-10 border-t border-white/20 pt-6 text-sm text-gray-400">
              <p>Author: {data.author || "Unknown"}</p>
              <p>Date: {data.date || "N/A"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
