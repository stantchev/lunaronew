import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatrixBackground from '@/components/MatrixBackground';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Lunaro - The Media of the Future',
    template: '%s | Lunaro'
  },
  description: 'Light in the information chaos. A hybrid digital media platform merging journalism, data, and AI to create trustworthy, intelligent media experiences.',
  keywords: [
    'news', 'latest news', 'breaking news', 'world news', 'today news', 
    'live news', 'top news', 'news update', 'current news', 'trending news',
    'international news', 'political news', 'sports news', 'business news', 
    'technology news', 'AI news', 'artificial intelligence', 'cybersecurity',
    'lunaro news', 'lunaro', 'lunaro media', 'ai media', 'future media',
    'automated journalism', 'digital media platform'
  ],
  authors: [{ name: 'Lunaro Team' }],
  creator: 'Lunaro',
  publisher: 'Lunaro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lunaro.news',
    siteName: 'Lunaro',
    title: 'Lunaro - The Media of the Future',
    description: 'Light in the information chaos. A hybrid digital media platform merging journalism, data, and AI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lunaro - The Media of the Future',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lunaro - The Media of the Future',
    description: 'Light in the information chaos. A hybrid digital media platform merging journalism, data, and AI.',
    images: ['/twitter-image.jpg'],
    creator: '@lunaro_news',
  },
  verification: {
    google: "HnOy4IdjuGHg51bin_-8LAPGS5-8Utf9xUSM9tcUZnw",
  },
  alternates: {
    canonical: 'https://lunaro.news',
    languages: {
      'en-US': 'https://lunaro.news',
    },
  },
  category: 'news',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://newsapi.org" />
        <meta name="theme-color" content="#00d4ff" />
        <meta name="msapplication-TileColor" content="#00d4ff" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <MatrixBackground />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Providers>
              {children}
            </Providers>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
