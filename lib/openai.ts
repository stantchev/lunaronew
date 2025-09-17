import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ArticleGenerationOptions {
  title: string;
  description: string;
  content: string;
  keyword?: string;
  language?: 'en' | 'bg';
  wordCount?: number;
}

export async function generateArticle(options: ArticleGenerationOptions): Promise<string> {
  const {
    title,
    description,
    content,
    keyword = '',
    language = 'en',
    wordCount = 700
  } = options;

  const languageInstruction = language === 'bg' ? 'in Bulgarian' : 'in English';
  

	const prompt = `
	You are a professional journalist writing for Lunaro, "The Media of the Future" – a hybrid digital media platform that merges journalism, data, and AI.

	Task:
	Based on the following news information, write a comprehensive ${wordCount}-word SEO-optimized article ${languageInstruction}.

	Original Title: ${title}
	Description: ${description}
	Content: ${content}
	${keyword ? `Focus Keyword: ${keyword}` : ''}

	Requirements:
	1. Write in Markdown/MDX format (NO <!DOCTYPE>, <html>, or <body>).
	2. Start with a compelling H1 title that naturally includes the focus keyword.
	3. Write an engaging introduction that hooks the reader within the first 2–3 sentences.
	4. Structure content with clear H2 and H3 subheadings, including at least one subheading with the focus keyword.
	5. Use short, readable paragraphs (max 3 sentences each).
	6. Integrate relevant data points, context, and authoritative sources.
	7. Maintain Lunaro’s professional, innovative, and trustworthy tone.
	8. Include transition words for readability and flow.
	9. End with a strong call-to-action encouraging reader engagement (e.g., share thoughts, explore related content).
	10. Ensure the article is SEO-friendly, optimized for search engines, and easily understandable by LLMs and Google Overviews.

	Formatting rules:
	- Use Markdown headings (#, ##, ###) instead of HTML tags.
	- Use bullet points or tables if helpful.
	- Keep the style conversational but authoritative.
	- Do not include raw HTML unless absolutely necessary.
	- Output must be clean Markdown/MDX only.
	`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional journalist and content creator specializing in AI-enhanced journalism for Lunaro media platform."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    return generatedContent;
  } catch (error) {
    console.error('Error generating article with OpenAI:', error);
    throw error;
  }
}