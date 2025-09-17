interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export async function fetchNewsArticles(query: string, pageSize: number = 10): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;
  
  if (!apiKey) {
    throw new Error('NEWS_API_KEY is not configured');
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${apiKey}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI request failed: ${response.status}`);
    }
    
    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`NewsAPI error: ${data.status}`);
    }
    
    return data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
}