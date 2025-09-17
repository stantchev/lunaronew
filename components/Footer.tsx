import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:seo@stanchev.bg' },
  ];

  const footerLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'RSS Feed', href: '#' },
  ];

  return (
    <footer className="glass border-t border-white/10 text-gray-300">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center neon-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold futuristic-text">LUNARO</span>
              </Link>
              <p className="text-gray-400 max-w-md mb-6">
                Light in the information chaos. A hybrid digital media platform merging journalism, data, and AI to create trustworthy, personalized news experiences.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    aria-label={link.name}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 futuristic-text">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-300">About</Link></li>
                <li><Link href="/articles" className="hover:text-blue-400 transition-colors duration-300">Articles</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4 futuristic-text">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link></li>
                <li><Link href="/rss" className="hover:text-blue-400 transition-colors duration-300">RSS Feed</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/10">
          <p className="text-center text-gray-400">
            © {currentYear} Lunaro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
