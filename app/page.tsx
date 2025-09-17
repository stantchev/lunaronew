import Link from 'next/link';
import { ArrowRight, Lightbulb, Globe, Users, Orbit, Zap, Shield, Brain, Cpu, Database } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles, Article } from "@/lib/getArticles";

export default async function Home() {
  // Взимаме последните 3 статии от MDX
  const latestArticles: Article[] = getLatestArticles(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container-custom py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center neon-glow animate-pulse">
                <Zap size={40} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="futuristic-text text-6xl md:text-7xl lg:text-8xl font-black tracking-wider block mb-4">
                LUNARO
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                The Media of the Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 max-w-2xl mx-auto font-semibold tracking-wide">
              LIGHT IN THE INFORMATION CHAOS
            </p>
            
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              Discover insightful articles, cutting-edge perspectives, and authentic voices that illuminate the path forward in our rapidly evolving world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/articles" className="btn-primary inline-flex items-center neon-glow">
                Explore Articles
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

 {/* Features Section */}
<section className="py-20 relative">
  <div className="container-custom">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-white mb-4 futuristic-text">
        Our Core Pillars
      </h2>
      <p className="text-xl text-gray-300">
        Five foundational principles that guide everything we do at Lunaro.
      </p>
    </div>

    {/* flex wrap: мобилно = падат един под друг, desktop = в един ред */}
    <div className="flex flex-wrap justify-center gap-8">
      <div className="text-center flex-1 min-w-[200px] max-w-[250px] glass-card p-6 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-glow">
          <Brain size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">AI Personalization</h3>
        <p className="text-gray-300">
          AI-driven recommendations and customizable feeds that adapt to your interests, reading habits, and context.
        </p>
      </div>

      <div className="text-center flex-1 min-w-[200px] max-w-[250px] glass-card p-6 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-glow">
          <Shield size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency & Trust</h3>
        <p className="text-gray-300">
          Rigorous fact-checking, source verification, and open data layers showing exactly where information comes from.
        </p>
      </div>

      <div className="text-center flex-1 min-w-[200px] max-w-[250px] glass-card p-6 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-glow">
          <Users size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactivity</h3>
        <p className="text-gray-300">
          Polls, Q&A sessions with experts, community contributions, and moderated discussions that engage readers.
        </p>
      </div>

      <div className="text-center flex-1 min-w-[200px] max-w-[250px] glass-card p-6 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-glow">
          <Globe size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Platform</h3>
        <p className="text-gray-300">
          Seamless experience across web, mobile apps, voice assistants, and social channels for maximum accessibility.
        </p>
      </div>

      <div className="text-center flex-1 min-w-[200px] max-w-[250px] glass-card p-6 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-glow">
          <Cpu size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Ethical Standards</h3>
        <p className="text-gray-300">
          No clickbait or misinformation. Balanced reporting and sustainable media practices that respect our readers.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Featured Articles */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 futuristic-text">Explore Lunaro Content</h2>
            <p className="text-xl text-gray-300">
              From breaking news to deep analysis, data visualizations to learning modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/articles" className="btn-primary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 glass"></div>
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 futuristic-text">
              Stay Informed, Stay Ahead
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community and be the first to access new articles, insights, and perspectives that shape the future.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center neon-glow">
              Get in Touch
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
