# Lunaro - The Media of the Future

A hybrid digital media platform that merges journalism, data, and artificial intelligence to create trustworthy, personalized news experiences.

## Features

### Core Platform
- **Voice Search**: Advanced voice search functionality in the articles section
- **AI-Powered Content**: Automated article generation using NewsAPI and OpenAI
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern Architecture**: Built with Next.js 13+ App Router

### Content Streams
- **Lunaro News**: Breaking news and real-time updates
- **Lunaro Deep**: In-depth analysis and investigative journalism
- **Lunaro Data**: Interactive visualizations and data-driven stories
- **Lunaro Learn**: Educational content and tutorials
- **Lunaro Voices**: Community engagement and reader polls

### AI Workflow
- **NewsAPI Integration**: Fetches latest news articles by keyword
- **OpenAI Content Generation**: Creates SEO-optimized articles in multiple languages
- **Automated Publishing**: Saves generated articles as MDX files
- **Dynamic Routing**: Auto-generated pages for new articles

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEWS_API_KEY=your_newsapi_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

## API Endpoints

### `/api/news`
Fetches news articles from NewsAPI
- **Method**: GET
- **Parameters**: `q` (query), `pageSize` (optional)
- **Example**: `/api/news?q=technology&pageSize=5`

### `/api/generate-article`
Generates a single article using OpenAI
- **Method**: POST
- **Body**: `{ title, description, content, keyword, language, author }`

### `/api/auto-news`
Automated workflow: NewsAPI → OpenAI → MDX files
- **Method**: POST
- **Body**: `{ keyword, language, author, maxArticles }`
- **Example**: 
```json
{
  "keyword": "artificial intelligence",
  "language": "en",
  "author": "Lunaro AI",
  "maxArticles": 3
}
```

## Usage Examples

### Generate Articles Automatically

```bash
curl -X POST http://localhost:3000/api/auto-news \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "climate change",
    "language": "en",
    "maxArticles": 2
  }'
```

### Voice Search
- Click the microphone icon in the search bar
- Speak your search query
- The system will automatically search for relevant articles

## File Structure

```
├── app/
│   ├── api/
│   │   ├── auto-news/route.ts
│   │   ├── generate-article/route.ts
│   │   └── news/route.ts
│   ├── articles/
│   ├── news/[slug]/
│   └── ...
├── components/
│   ├── VoiceSearch.tsx
│   └── ...
├── content/
│   └── articles/          # Auto-generated MDX files
├── lib/
│   ├── newsApi.ts
│   ├── openai.ts
│   └── mdxUtils.ts
└── types/
    └── speech.d.ts
```

## Scheduling (Optional)

To fully automate article generation, you can:

1. **Vercel Cron Jobs**: Add to `vercel.json`
2. **GitHub Actions**: Create workflow files
3. **External Cron**: Use services like cron-job.org

Example Vercel cron configuration:
```json
{
  "crons": [
    {
      "path": "/api/auto-news",
      "schedule": "0 9 * * *"
    }
  ]
}
```

## Technology Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4
- **News**: NewsAPI
- **Content**: MDX files
- **Voice**: Web Speech API
- **Icons**: Lucide React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.