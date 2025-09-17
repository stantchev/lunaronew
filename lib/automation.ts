import { fetchNewsArticles } from './newsApi';
import { generateArticle } from './openai';
import { saveArticleAsMDX, createSlug, getCurrentDate } from './mdxUtils';

export interface AutomationConfig {
  keywords: string[];
  maxArticlesPerKeyword: number;
  publishingInterval: number; // in minutes
  enableAutoPublishing: boolean;
  contentFilters: {
    minWordCount: number;
    maxWordCount: number;
    excludeKeywords: string[];
    requiredKeywords: string[];
  };
  seoSettings: {
    generateMetaDescriptions: boolean;
    optimizeHeadings: boolean;
    addInternalLinks: boolean;
  };
}

export interface AutomationResult {
  success: boolean;
  articlesGenerated: number;
  errors: string[];
  articles: Array<{
    slug: string;
    title: string;
    category: string;
    publishedAt: string;
  }>;
}

class NewsAutomation {
  private config: AutomationConfig;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(config: AutomationConfig) {
    this.config = config;
  }

  /**
   * Start automated content generation
   */
  public start(): void {
    if (this.isRunning) {
      console.log('Automation is already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting news automation...');

    // Run immediately
    this.runAutomationCycle();

    // Set up interval for continuous automation
    if (this.config.enableAutoPublishing) {
      this.intervalId = setInterval(() => {
        this.runAutomationCycle();
      }, this.config.publishingInterval * 60 * 1000);
    }
  }

  /**
   * Stop automated content generation
   */
  public stop(): void {
    if (!this.isRunning) {
      console.log('Automation is not running');
      return;
    }

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('News automation stopped');
  }

  /**
   * Run a single automation cycle
   */
  private async runAutomationCycle(): Promise<AutomationResult> {
    const result: AutomationResult = {
      success: true,
      articlesGenerated: 0,
      errors: [],
      articles: []
    };

    try {
      console.log('Running automation cycle...');

      for (const keyword of this.config.keywords) {
        try {
          const keywordResult = await this.processKeyword(keyword);
          result.articlesGenerated += keywordResult.articlesGenerated;
          result.articles.push(...keywordResult.articles);
        } catch (error) {
          const errorMessage = `Error processing keyword "${keyword}": ${error instanceof Error ? error.message : 'Unknown error'}`;
          result.errors.push(errorMessage);
          console.error(errorMessage);
        }
      }

      console.log(`Automation cycle completed. Generated ${result.articlesGenerated} articles.`);
    } catch (error) {
      result.success = false;
      const errorMessage = `Automation cycle failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      result.errors.push(errorMessage);
      console.error(errorMessage);
    }

    return result;
  }

  /**
   * Process a single keyword
   */
  private async processKeyword(keyword: string): Promise<AutomationResult> {
    const result: AutomationResult = {
      success: true,
      articlesGenerated: 0,
      errors: [],
      articles: []
    };

    try {
      // Fetch news articles for the keyword
      const newsArticles = await fetchNewsArticles(keyword, this.config.maxArticlesPerKeyword * 2);
      
      if (newsArticles.length === 0) {
        console.log(`No news articles found for keyword: ${keyword}`);
        return result;
      }

      // Filter articles based on content filters
      const filteredArticles = this.filterArticles(newsArticles, keyword);
      
      // Process up to maxArticlesPerKeyword
      const articlesToProcess = filteredArticles.slice(0, this.config.maxArticlesPerKeyword);

      for (const newsArticle of articlesToProcess) {
        try {
          const generatedArticle = await this.generateAndSaveArticle(newsArticle, keyword);
          result.articles.push(generatedArticle);
          result.articlesGenerated++;

          // Add delay between API calls to avoid rate limiting
          await this.delay(2000);
        } catch (error) {
          const errorMessage = `Error processing article "${newsArticle.title}": ${error instanceof Error ? error.message : 'Unknown error'}`;
          result.errors.push(errorMessage);
          console.error(errorMessage);
        }
      }
    } catch (error) {
      result.success = false;
      const errorMessage = `Error processing keyword "${keyword}": ${error instanceof Error ? error.message : 'Unknown error'}`;
      result.errors.push(errorMessage);
      console.error(errorMessage);
    }

    return result;
  }

  /**
   * Filter articles based on content filters
   */
  private filterArticles(articles: any[], keyword: string): any[] {
    return articles.filter(article => {
      const content = `${article.title} ${article.description || ''} ${article.content || ''}`.toLowerCase();
      
      // Check for excluded keywords
      if (this.config.contentFilters.excludeKeywords.some(excludeKeyword => 
        content.includes(excludeKeyword.toLowerCase())
      )) {
        return false;
      }

      // Check for required keywords
      if (this.config.contentFilters.requiredKeywords.length > 0) {
        const hasRequiredKeyword = this.config.contentFilters.requiredKeywords.some(requiredKeyword =>
          content.includes(requiredKeyword.toLowerCase())
        );
        if (!hasRequiredKeyword) {
          return false;
        }
      }

      // Check word count (approximate)
      const wordCount = content.split(' ').length;
      if (wordCount < this.config.contentFilters.minWordCount || 
          wordCount > this.config.contentFilters.maxWordCount) {
        return false;
      }

      return true;
    });
  }

  /**
   * Generate and save a single article
   */
  private async generateAndSaveArticle(newsArticle: any, keyword: string): Promise<{
    slug: string;
    title: string;
    category: string;
    publishedAt: string;
  }> {
    // Generate article content using OpenAI
    const generatedContent = await generateArticle({
      title: newsArticle.title,
      description: newsArticle.description || '',
      content: newsArticle.content || newsArticle.description || '',
      keyword,
      language: 'en',
      wordCount: 800
    });

    // Create slug and metadata
    const slug = createSlug(newsArticle.title);
    const date = getCurrentDate();
    const excerpt = this.generateExcerpt(newsArticle.description || generatedContent);
    const category = this.determineCategory(newsArticle.title, keyword);

    // Add SEO optimizations if enabled
    let optimizedContent = generatedContent;
    if (this.config.seoSettings.optimizeHeadings) {
      optimizedContent = this.optimizeHeadings(optimizedContent, keyword);
    }
    if (this.config.seoSettings.addInternalLinks) {
      optimizedContent = this.addInternalLinks(optimizedContent);
    }

    // Save as MDX file
    const savedSlug = await saveArticleAsMDX(slug, {
      title: newsArticle.title,
      author: 'Lunaro AI',
      date,
      category,
      excerpt,
      readTime: this.calculateReadTime(optimizedContent)
    }, optimizedContent);

    return {
      slug: savedSlug,
      title: newsArticle.title,
      category,
      publishedAt: date
    };
  }

  /**
   * Generate excerpt from content
   */
  private generateExcerpt(content: string): string {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return cleanContent.length > 150 
      ? cleanContent.substring(0, 150) + '...'
      : cleanContent || 'Latest news and insights from Lunaro.';
  }

  /**
   * Determine article category based on title and keyword
   */
  private determineCategory(title: string, keyword: string): string {
    const titleLower = title.toLowerCase();
    const keywordLower = keyword.toLowerCase();

    if (titleLower.includes('analysis') || titleLower.includes('deep') || titleLower.includes('investigation')) {
      return 'Lunaro Deep';
    } else if (titleLower.includes('data') || titleLower.includes('chart') || titleLower.includes('statistics')) {
      return 'Lunaro Data';
    } else if (titleLower.includes('learn') || titleLower.includes('guide') || titleLower.includes('tutorial')) {
      return 'Lunaro Learn';
    } else if (titleLower.includes('poll') || titleLower.includes('community') || titleLower.includes('opinion')) {
      return 'Lunaro Voices';
    } else if (keywordLower.includes('ai') || keywordLower.includes('artificial intelligence') || keywordLower.includes('technology')) {
      return 'Lunaro Tech';
    } else {
      return 'Lunaro News';
    }
  }

  /**
   * Optimize headings for SEO
   */
  private optimizeHeadings(content: string, keyword: string): string {
    // Ensure at least one H2 contains the keyword
    const h2Regex = /^## (.+)$/gm;
    const h2Matches = content.match(h2Regex);
    
    if (h2Matches && h2Matches.length > 0) {
      const firstH2 = h2Matches[0];
      if (!firstH2.toLowerCase().includes(keyword.toLowerCase())) {
        const newH2 = firstH2.replace(/^## /, `## ${keyword}: `);
        content = content.replace(firstH2, newH2);
      }
    }

    return content;
  }

  /**
   * Add internal links to content
   */
  private addInternalLinks(content: string): string {
    // Simple internal linking - replace common terms with links
    const internalLinks = {
      'artificial intelligence': '/articles?category=AI',
      'cybersecurity': '/articles?category=Cybersecurity',
      'technology': '/articles?category=Technology',
      'data analysis': '/articles?category=Data',
      'machine learning': '/articles?category=AI'
    };

    let linkedContent = content;
    Object.entries(internalLinks).forEach(([term, link]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      linkedContent = linkedContent.replace(regex, `[${term}](${link})`);
    });

    return linkedContent;
  }

  /**
   * Calculate estimated read time
   */
  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  /**
   * Utility function to add delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current automation status
   */
  public getStatus(): {
    isRunning: boolean;
    config: AutomationConfig;
    nextRunTime?: Date;
  } {
    return {
      isRunning: this.isRunning,
      config: this.config,
      nextRunTime: this.intervalId ? new Date(Date.now() + this.config.publishingInterval * 60 * 1000) : undefined
    };
  }

  /**
   * Update automation configuration
   */
  public updateConfig(newConfig: Partial<AutomationConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('Automation configuration updated');
  }
}

// Default configuration
export const defaultAutomationConfig: AutomationConfig = {
  keywords: [
    'artificial intelligence',
    'cybersecurity',
    'technology innovation',
    'data privacy',
    'machine learning',
    'blockchain',
    'quantum computing',
    'robotics'
  ],
  maxArticlesPerKeyword: 2,
  publishingInterval: 60, // 1 hour
  enableAutoPublishing: false, // Disabled by default for safety
  contentFilters: {
    minWordCount: 100,
    maxWordCount: 2000,
    excludeKeywords: ['spam', 'advertisement', 'clickbait'],
    requiredKeywords: []
  },
  seoSettings: {
    generateMetaDescriptions: true,
    optimizeHeadings: true,
    addInternalLinks: true
  }
};

// Export singleton instance
export const newsAutomation = new NewsAutomation(defaultAutomationConfig);

export default NewsAutomation;