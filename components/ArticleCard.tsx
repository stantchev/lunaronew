import Link from 'next/link';
import { Calendar, User, ArrowRight, Zap } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  readTime?: string;
}

const ArticleCard = ({ title, excerpt, author, date, category, slug, readTime }: ArticleCardProps) => {
  return (
    <article className="article-card h-full flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 text-sm font-medium rounded-full border border-blue-500/30">
          <Zap className="w-3 h-3 mr-1" />
          {category}
        </span>
        {readTime && (
          <span className="text-sm text-gray-400">{readTime}</span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors duration-300">
        <Link href={`/articles/${slug}`}>
          {title}
        </Link>
      </h3>

      <p className="text-gray-300 mb-4 flex-1 line-clamp-3">
        {excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <User size={16} />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
        </div>

        <Link
          href={`/articles/${slug}`}
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-all duration-300 group-hover:translate-x-1"
        >
          <span>Read more</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;