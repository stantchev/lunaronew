export default function Terms() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Please read these terms carefully before using Lunaro's services.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              <strong>Last updated:</strong> December 2024
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              By accessing and using Lunaro ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Lunaro is a hybrid digital media platform that provides:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>AI-powered news articles and analysis</li>
              <li>Personalized content recommendations</li>
              <li>Interactive data visualizations</li>
              <li>Educational content and tutorials</li>
              <li>Community engagement features</li>
              <li>Voice search capabilities</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              As a user of Lunaro, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>Provide accurate information when creating an account</li>
              <li>Use the service in compliance with all applicable laws</li>
              <li>Respect other users in community discussions</li>
              <li>Not attempt to circumvent our security measures</li>
              <li>Not use the service for spam, harassment, or illegal activities</li>
              <li>Respect intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Content and Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              All content on Lunaro, including articles, data visualizations, and AI-generated content, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI-Generated Content</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Lunaro uses artificial intelligence to generate and curate content. While we strive for accuracy, AI-generated content may contain errors or biases. We encourage users to verify important information through multiple sources.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy and Data</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscription and Payments</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Lunaro offers both free and premium content:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>Free access includes basic news and articles</li>
              <li>Premium subscriptions provide access to in-depth analysis and exclusive content</li>
              <li>Micro-payments are available for individual premium articles</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>Refunds are available within 30 days of purchase</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Lunaro provides content for informational purposes. We are not liable for decisions made based on our content. The service is provided "as is" without warranties of any kind.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We reserve the right to terminate or suspend accounts that violate these terms. Users may also terminate their accounts at any time through their account settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We may update these terms from time to time. Users will be notified of significant changes via email or through the platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
