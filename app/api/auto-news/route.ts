import { NextRequest, NextResponse } from 'next/server';
import { fetchNewsArticles } from '@/lib/newsApi';
import { generateArticle } from '@/lib/openai';
import { saveArticleAsMDX, createSlug, getCurrentDate } from '@/lib/mdxUtils';
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      keyword = 'technology', 
      language = 'en', 
      author = 'Lunaro AI',
      maxArticles = 1 
    } = body;

    // Fetch latest news articles
    const newsArticles = await fetchNewsArticles(keyword, 5);
    
    if (newsArticles.length === 0) {
      return NextResponse.json(
        { error: 'No news articles found for the given keyword' },
        { status: 404 }
      );
    }

    const generatedArticles = [];

    // Process up to maxArticles
    for (let i = 0; i < Math.min(maxArticles, newsArticles.length); i++) {
      const newsArticle = newsArticles[i];
      
      try {
        // Generate article content using OpenAI
        const generatedContent = await generateArticle({
          title: newsArticle.title,
          description: newsArticle.description || '',
          content: newsArticle.content || newsArticle.description || '',
          keyword,
          language,
          wordCount: 700
        });

        // Create slug and metadata
        const slug = createSlug(newsArticle.title);
        const date = getCurrentDate();
        const excerpt = newsArticle.description && newsArticle.description.length > 150 
          ? newsArticle.description.substring(0, 150) + '...' 
          : newsArticle.description || 'Latest news and insights from Lunaro.';

        // Determine category based on content
        let category = 'Lunaro News';
        const titleLower = newsArticle.title.toLowerCase();
        if (titleLower.includes('analysis') || titleLower.includes('deep') || titleLower.includes('investigation')) {
          category = 'Lunaro Deep';
        } else if (titleLower.includes('data') || titleLower.includes('chart') || titleLower.includes('statistics')) {
          category = 'Lunaro Data';
        } else if (titleLower.includes('learn') || titleLower.includes('guide') || titleLower.includes('tutorial')) {
          category = 'Lunaro Learn';
        } else if (titleLower.includes('poll') || titleLower.includes('community') || titleLower.includes('opinion')) {
          category = 'Lunaro Voices';
        }

        // Save as MDX file
        const savedSlug = await saveArticleAsMDX(slug, {
          title: newsArticle.title,
          author,
          date,
          category,
          excerpt,
          readTime: '5 min read'
        }, generatedContent);

        generatedArticles.push({
          slug: savedSlug,
          title: newsArticle.title,
          category,
          date,
          originalUrl: newsArticle.url
        });

        // Add delay between API calls to avoid rate limiting
        if (i < maxArticles - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (articleError) {
        console.error(`Error processing article ${i + 1}:`, articleError);
        // Continue with next article instead of failing completely
      }
    }

    if (generatedArticles.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate any articles' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      articlesGenerated: generatedArticles.length,
      articles: generatedArticles,
      keyword,
      message: `Successfully generated ${generatedArticles.length} article(s)`
    });

  } catch (error) {
    console.error('Error in auto-news generation:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate articles automatically',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}