import { NextRequest, NextResponse } from 'next/server';
import { fetchNewsArticles } from '@/lib/newsApi';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  try {
    const articles = await fetchNewsArticles(query, pageSize);
    
    return NextResponse.json({
      success: true,
      articles,
      total: articles.length
    });
  } catch (error) {
    console.error('Error in news API route:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch news articles',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}