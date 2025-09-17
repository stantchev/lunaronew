import { Rss, Download, Code, Globe } from 'lucide-react';

export default function RSSPage() {
  const rssFeeds = [
    {
      title: "All Articles",
      description: "Complete feed of all Lunaro content across all categories",
      url: "/rss/all.xml",
      icon: Globe
    },
    {
      title: "Lunaro News",
      description: "Breaking news and real-time updates",
      url: "/rss/news.xml",
      icon: Rss
    },
    {
      title: "Lunaro Deep",
      description: "In-depth analysis and investigative journalism",
      url: "/rss/deep.xml",
      icon: Rss
    },
    {
      title: "Lunaro Data",
      description: "Data visualizations and data-driven stories",
      url: "/rss/data.xml",
      icon: Rss
    },
    {
      title: "Lunaro Learn",
      description: "Educational content and tutorials",
      url: "/rss/learn.xml",
      icon: Rss
    },
    {
      title: "Lunaro Voices",
      description: "Community engagement and reader polls",
      url: "/rss/voices.xml",
      icon: Rss
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Rss size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              RSS Feeds
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay updated with Lunaro's latest content through RSS feeds
            </p>
          </div>
        </div>
      </section>

      {/* RSS Feeds */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Available RSS Feeds
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose from our specialized content streams or subscribe to everything
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {rssFeeds.map((feed, index) => (
                <div key={index} className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feed.icon size={24} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feed.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {feed.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <a
                          href={feed.url}
                          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
                        >
                          <Download size={16} className="mr-2" />
                          Subscribe
                        </a>
                        <code className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {feed.url}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* How to Use RSS */}
            <div className="card p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    How to Use RSS Feeds
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    RSS (Really Simple Syndication) allows you to stay updated with our latest content without visiting the website directly.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Popular RSS Readers
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• <strong>Feedly</strong> - Web-based RSS reader</li>
                    <li>• <strong>Inoreader</strong> - Advanced RSS management</li>
                    <li>• <strong>NewsBlur</strong> - Social RSS reader</li>
                    <li>• <strong>RSS Guard</strong> - Desktop RSS client</li>
                    <li>• <strong>Reeder</strong> - iOS/macOS RSS app</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Getting Started
                  </h4>
                  <ol className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>1. Choose an RSS reader from the list</li>
                    <li>2. Copy the RSS feed URL you want</li>
                    <li>3. Add the URL to your RSS reader</li>
                    <li>4. Enjoy automatic updates!</li>
                  </ol>
                </div>
              </div>

              <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-indigo-800 dark:text-indigo-200">
                  <strong>Pro Tip:</strong> Subscribe to multiple feeds to create a personalized news experience that matches your interests across different Lunaro content streams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
