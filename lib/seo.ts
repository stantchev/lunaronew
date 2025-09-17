import { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  image?: string;
  url?: string;
  type?: 'article' | 'website' | 'profile';
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = 'Lunaro',
    publishedTime,
    modifiedTime,
    section = 'News',
    tags = [],
    image = '/og-image.jpg',
    url = 'https://lunaro.news',
    type = 'article'
  } = seoData;

  const metadata: Metadata = {
    title,
    description,
    keywords: [...keywords, 'Lunaro', 'AI news', 'technology', 'future media'],
    authors: [{ name: author }],
    creator: author,
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
      type: type === 'article' ? 'article' : 'website',
      locale: 'en_US',
      url,
      siteName: 'Lunaro',
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        section,
        authors: [author],
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@lunaro_news',
    },
    alternates: {
      canonical: url,
    },
    category: section.toLowerCase(),
  };

  return metadata;
}

/**
 * Generate JSON-LD structured data
 */
export function generateJSONLD(seoData: SEOData & { content?: string }): object {
  const {
    title,
    description,
    author = 'Lunaro',
    publishedTime,
    modifiedTime,
    section = 'News',
    image = '/og-image.jpg',
    url = 'https://lunaro.news',
    content,
    type = 'article'
  } = seoData;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'NewsArticle' : 'WebSite',
    headline: title,
    description,
    image: {
      '@type': 'ImageObject',
      url: `https://lunaro.news${image}`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://lunaro.news/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lunaro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lunaro.news/logo.png',
        width: 200,
        height: 60,
      },
      url: 'https://lunaro.news',
      sameAs: [
        'https://twitter.com/lunaro_news',
        'https://linkedin.com/company/lunaro',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
  };

  if (type === 'article') {
    return {
      ...baseSchema,
      '@type': 'NewsArticle',
      datePublished: publishedTime || new Date().toISOString(),
      dateModified: modifiedTime || publishedTime || new Date().toISOString(),
      articleSection: section,
      wordCount: content ? content.split(' ').length : undefined,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      genre: 'news',
      keywords: seoData.keywords?.join(', '),
    };
  }

  return baseSchema;
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJSONLD(breadcrumbs: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate FAQ JSON-LD
 */
export function generateFAQJSONLD(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationJSONLD(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lunaro',
    alternateName: 'Lunaro News',
    description: 'Light in the information chaos. A hybrid digital media platform merging journalism, data, and AI.',
    url: 'https://lunaro.news',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lunaro.news/logo.png',
      width: 200,
      height: 60,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+359-877-038729',
      contactType: 'customer service',
      email: 'lunaronews@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sofia',
      addressCountry: 'Bulgaria',
    },
    sameAs: [
      'https://twitter.com/lunaro_news',
      'https://linkedin.com/company/lunaro',
      'https://github.com/lunaro-news',
    ],
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Milen Stanchev',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Cybersecurity',
      'Technology News',
      'Data Analysis',
      'Digital Media',
      'Journalism',
    ],
    areaServed: 'Worldwide',
    serviceType: 'News and Media',
  };
}

/**
 * Generate WebSite JSON-LD with search action
 */
export function generateWebSiteJSONLD(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lunaro',
    alternateName: 'Lunaro - The Media of the Future',
    description: 'Light in the information chaos. A hybrid digital media platform merging journalism, data, and AI.',
    url: 'https://lunaro.news',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://lunaro.news/articles?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lunaro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lunaro.news/logo.png',
      },
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Lunaro',
    },
  };
}

/**
 * Optimize content for SEO
 */
export function optimizeContentForSEO(content: string, keyword: string): string {
  let optimizedContent = content;

  // Ensure keyword appears in first paragraph
  const paragraphs = optimizedContent.split('\n\n');
  if (paragraphs.length > 0 && !paragraphs[0].toLowerCase().includes(keyword.toLowerCase())) {
    paragraphs[0] = paragraphs[0].replace(/^(.*?)(\.)/, `$1 focusing on ${keyword}$2`);
    optimizedContent = paragraphs.join('\n\n');
  }

  // Add keyword to at least one heading
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  let hasKeywordInHeading = false;
  
  optimizedContent = optimizedContent.replace(headingRegex, (match, hashes, title) => {
    if (!hasKeywordInHeading && !title.toLowerCase().includes(keyword.toLowerCase())) {
      hasKeywordInHeading = true;
      return `${hashes} ${keyword}: ${title}`;
    }
    return match;
  });

  return optimizedContent;
}

/**
 * Calculate content readability score (Flesch Reading Ease)
 */
export function calculateReadabilityScore(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
  return Math.max(0, Math.min(100, score));
}

/**
 * Count syllables in a word (approximate)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  const vowels = 'aeiouy';
  let count = 0;
  let previousWasVowel = false;
  
  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      count++;
    }
    previousWasVowel = isVowel;
  }
  
  if (word.endsWith('e')) count--;
  return Math.max(1, count);
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove markdown and HTML
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }

  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}