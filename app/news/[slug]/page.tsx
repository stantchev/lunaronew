import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { use } from 'react';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/mdxUtils';
import ArticleCard from '@/components/ArticleCard';

// Sample related articles for now
const relatedArticles = [
  {
    title: "Data Visualization: Climate Change Impact by Region", 
    excerpt: "Interactive maps and charts revealing how climate patterns are shifting globally, with personalized insights for your location.",
    author: "Sarah Johnson",
    date: "Dec 12, 2024",
    category: "Lunaro Data",
    slug: "climate-change-data-visualization",
    readTime: "7 min read"
  },
  {
    title: "Understanding Cryptocurrency: A Beginner's Guide",
    excerpt: "Learn the fundamentals of digital currencies through our interactive tutorial series, designed for complete beginners.",
    author: "Michael Rodriguez",
    date: "Dec 10, 2024",
    category: "Lunaro Learn", 
    slug: "cryptocurrency-beginners-guide",
    readTime: "4 min read"
  },
  {
    title: "Community Poll Results: The Future of Work",
    excerpt: "Our readers weigh in on remote work, AI automation, and career priorities. See how your views compare with 10,000+ responses.",
    author: "Elena Rodriguez",
    date: "Dec 8, 2024",
    category: "Lunaro Voices",
    slug: "community-poll-future-work",
    readTime: "6 min read"
  }
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function NewsArticlePage({ params }: PageProps) {
  const { slug } = use(params);
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { metadata, content } = article;

  return (
    <div>
      {/* Article Header */}
      <article className="bg-white">
        <div className="container-custom py-12">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Articles
            </Link>
          </div>

          {/* Article Meta */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
                {metadata.category}
              </span>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {metadata.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span className="font-medium">{metadata.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{metadata.date}</span>
              </div>
              {metadata.readTime && (
                <div className="flex items-center space-x-2">
                  <Clock size={18} />
                  <span>{metadata.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* Author Bio */}
            <div className="mt-16 p-8 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">
                    {metadata.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{metadata.author}</h3>
                  <p className="text-gray-600 mb-4">
                    {metadata.author === 'Lunaro AI' 
                      ? 'AI-powered content generation system that creates comprehensive, fact-checked articles by analyzing multiple news sources and applying advanced natural language processing.'
                      : 'Contributing writer for Lunaro, specializing in technology, innovation, and future-focused journalism.'
                    }
                  </p>
                  <div className="flex space-x-4">
                    <Link href="/about" className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Learn More
                    </Link>
                    <Link href="/articles" className="text-indigo-600 hover:text-indigo-700 font-medium">
                      More Articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Enjoyed This Article?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Subscribe to our newsletter and never miss our latest AI-generated insights and perspectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="bg-white text-indigo-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
