import { NextRequest, NextResponse } from 'next/server';
import { generateArticle } from '@/lib/openai';
import { saveArticleAsMDX, createSlug, getCurrentDate } from '@/lib/mdxUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      content,
      keyword,
      language = 'en',
      author = 'AI Assistant',
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // 📝 Generate article content using OpenAI
    let generatedContent = await generateArticle({
      title,
      description,
      content: content || description,
      keyword,
      language,
      wordCount: 700,
    });

    // 🧹 Clean content (remove HTML boilerplate if present)
    generatedContent = generatedContent
      .replace(/<!DOCTYPE html>/gi, '')
      .replace(/<\/?html>/gi, '')
      .replace(/<\/?head>[\s\S]*?<\/head>/gi, '')
      .replace(/<\/?body>/gi, '')
      .trim();

    // ✅ Wrap with Markdown heading if not already present
    if (!/^# /.test(generatedContent)) {
      generatedContent = `# ${title}\n\n${generatedContent}`;
    }

    // 📌 Create slug and metadata
    const slug = createSlug(title);
    const date = getCurrentDate();
    const excerpt =
      description.length > 150
        ? description.substring(0, 150) + '...'
        : description;

    // 🗂️ Determine category
    let category = 'Lunaro News';
    const lower = title.toLowerCase();
    if (lower.includes('analysis') || lower.includes('deep')) {
      category = 'Lunaro Deep';
    } else if (lower.includes('data') || lower.includes('chart')) {
      category = 'Lunaro Data';
    } else if (lower.includes('learn') || lower.includes('guide')) {
      category = 'Lunaro Learn';
    } else if (lower.includes('poll') || lower.includes('community')) {
      category = 'Lunaro Voices';
    }

    // 💾 Save as MDX file
    const savedSlug = await saveArticleAsMDX(
      slug,
      {
        title,
        author,
        date,
        category,
        excerpt,
        readTime: '5 min read',
      },
      generatedContent
    );

    return NextResponse.json({
      success: true,
      slug: savedSlug,
      title,
      category,
      date,
      message: '✅ Article generated and saved successfully',
    });
  } catch (error) {
    console.error('❌ Error generating article:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate article',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}