'use client';

import VoiceSearch from '@/components/VoiceSearch';
import ArticleCard from '@/components/ArticleCard';
import { useState } from 'react';

const categories = [
  "All",
  "Lunaro News",
  "Lunaro Deep",
  "Lunaro Data",
  "Lunaro Learn",
  "Lunaro Voices",
];

export default function ArticlesClient({ articles }: { articles: any[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearch = (q: string) => setQuery(q);

  // 🔑 ако articles е undefined → fallback към []
  const safeArticles = articles || [];

  const filteredArticles = safeArticles.filter((article) => {
    const matchesQuery =
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <VoiceSearch onSearch={handleSearch} />

            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category === selectedCategory
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>
    </div>
  );
}
