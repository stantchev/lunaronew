# Lunaro - Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the Lunaro futuristic news website with automated content publishing and SEO optimization.

## System Requirements

### Server Requirements
- **Node.js**: Version 18.0 or higher
- **Memory**: Minimum 2GB RAM (4GB recommended)
- **Storage**: Minimum 10GB free space
- **Network**: Stable internet connection for API calls

### Dependencies
- Next.js 15+
- React 18+
- Tailwind CSS
- TypeScript
- OpenAI API access
- NewsAPI access

## Environment Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Keys (Required)
NEWS_API_KEY=your_newsapi_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Lunaro

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 2. API Key Setup

#### NewsAPI Setup
1. Visit [NewsAPI.org](https://newsapi.org/)
2. Create a free account
3. Get your API key from the dashboard
4. Add to `.env.local` as `NEWS_API_KEY`

#### OpenAI Setup
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Generate an API key
4. Add to `.env.local` as `OPENAI_API_KEY`

## Installation Steps

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd lunaro-news

# Install dependencies
npm install

# Build the application
npm run build
```

### 2. Database Setup
The application uses file-based storage for articles. Ensure the following directories exist:
```bash
mkdir -p content/articles
mkdir -p public/images
```

### 3. Content Directory Structure
```
content/
├── articles/           # Auto-generated MDX files
└── images/            # Article images (optional)

public/
├── manifest.json      # PWA manifest
├── robots.txt         # SEO robots file
├── favicon.ico        # Site favicon
└── og-image.jpg       # Default Open Graph image
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t lunaro-news .
docker run -p 3000:3000 --env-file .env.local lunaro-news
```

### Option 3: Traditional Server
```bash
# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start npm --name "lunaro-news" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Automation Configuration

### 1. Access Admin Panel
Navigate to `/admin` to configure automation settings:
- Keywords for content generation
- Publishing intervals
- Content filters
- SEO settings

### 2. Automation API Endpoints
- `GET /api/automation` - Get status
- `POST /api/automation` - Control automation
- `PUT /api/automation` - Update configuration

### 3. Manual Content Generation
```bash
# Generate articles for specific keywords
curl -X POST http://localhost:3000/api/auto-news \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "artificial intelligence",
    "language": "en",
    "maxArticles": 3
  }'
```

## SEO Optimization Features

### 1. Structured Data
- Article schema markup
- Organization schema
- Breadcrumb navigation
- FAQ schema (when applicable)

### 2. Meta Tags
- Dynamic title generation
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### 3. Performance Optimization
- Image optimization
- Code splitting
- Static generation
- CDN integration

### 4. Sitemap Generation
Automatic sitemap generation at `/sitemap.xml` including:
- Static pages
- Dynamic article pages
- Proper priority and change frequency

## Monitoring and Maintenance

### 1. Health Checks
Monitor these endpoints:
- `/` - Site availability
- `/api/automation` - Automation status
- `/sitemap.xml` - SEO functionality

### 2. Log Monitoring
Key logs to monitor:
- Article generation errors
- API rate limiting
- Content validation failures

### 3. Performance Monitoring
- Core Web Vitals
- API response times
- Content generation speed
- SEO score tracking

## Security Considerations

### 1. API Key Security
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Monitor API usage

### 2. Content Validation
- Implement content filters
- Validate generated content
- Monitor for inappropriate content
- Set up content moderation

### 3. Rate Limiting
- Implement API rate limiting
- Monitor API usage quotas
- Set up alerts for quota limits

## Troubleshooting

### Common Issues

#### 1. API Key Errors
```bash
# Check environment variables
echo $NEWS_API_KEY
echo $OPENAI_API_KEY

# Verify API connectivity
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

#### 2. Content Generation Failures
- Check API quotas
- Verify content filters
- Review error logs
- Test with single article generation

#### 3. SEO Issues
- Validate structured data with Google's Rich Results Test
- Check sitemap accessibility
- Verify meta tag generation
- Test Open Graph tags

### Performance Issues
- Monitor memory usage during content generation
- Optimize image sizes
- Enable caching
- Use CDN for static assets

## Backup and Recovery

### 1. Content Backup
```bash
# Backup articles
tar -czf articles-backup-$(date +%Y%m%d).tar.gz content/articles/

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup/articles-$DATE.tar.gz" content/articles/
find backup/ -name "articles-*.tar.gz" -mtime +7 -delete
```

### 2. Configuration Backup
- Export automation settings
- Backup environment variables
- Document custom configurations

## Scaling Considerations

### 1. Horizontal Scaling
- Use load balancers
- Implement session management
- Consider database migration for high volume

### 2. Content Delivery
- Implement CDN
- Optimize images
- Enable compression
- Use edge caching

### 3. API Management
- Implement API caching
- Use multiple API keys
- Set up failover mechanisms

## Support and Updates

### 1. Regular Updates
- Update dependencies monthly
- Monitor security advisories
- Test updates in staging environment

### 2. Feature Updates
- Monitor automation performance
- Gather user feedback
- Implement A/B testing for new features

### 3. Community Support
- Check GitHub issues
- Join community discussions
- Contribute improvements

## Conclusion

This deployment guide provides a comprehensive setup for the Lunaro news website. The system is designed to be scalable, maintainable, and SEO-optimized. Regular monitoring and maintenance will ensure optimal performance and content quality.

For additional support or questions, please refer to the documentation or create an issue in the project repository.