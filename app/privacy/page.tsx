export default function Privacy() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At Lunaro, we collect information to provide you with personalized, high-quality content and services. This includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>Account information (name, email address) when you create an account</li>
              <li>Reading preferences and article interactions to personalize your feed</li>
              <li>Device and browser information for technical optimization</li>
              <li>Voice search queries when you use our voice search feature</li>
              <li>Community contributions, polls, and feedback you provide</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>Provide personalized article recommendations through our AI system</li>
              <li>Improve our fact-checking and source verification processes</li>
              <li>Enable community features like polls and discussions</li>
              <li>Send you relevant updates and newsletters (with your consent)</li>
              <li>Analyze usage patterns to improve our platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Protection & Security</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Blockchain-based verification for content authenticity</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of personalized recommendations</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent for data processing</li>
              <li>File complaints with relevant data protection authorities</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies & Tracking</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have questions about this Privacy Policy or how we handle your data, please contact us at{' '}
              <a href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
