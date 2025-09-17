import fs from 'fs';
import path from 'path';

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

interface ArticleMetadata {
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  readTime?: string;
}

export async function saveArticleAsMDX(
  slug: string,
  metadata: ArticleMetadata,
  content: string
): Promise<string> {
  const contentDir = path.join(process.cwd(), 'content', 'articles');
  
  // Ensure content directory exists
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const frontmatter = `---
title: "${metadata.title}"
author: "${metadata.author}"
date: "${metadata.date}"
category: "${metadata.category}"
excerpt: "${metadata.excerpt}"
${metadata.readTime ? `readTime: "${metadata.readTime}"` : ''}
---

`;

  const fullContent = frontmatter + content;
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  try {
    fs.writeFileSync(filePath, fullContent, 'utf8');
    return slug;
  } catch (error) {
    console.error('Error saving MDX file:', error);
    throw error;
  }
}

export function getAllArticleSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'content', 'articles');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  return fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''));
}

export function getArticleBySlug(slug: string): { metadata: ArticleMetadata; content: string } | null {
  const contentDir = path.join(process.cwd(), 'content', 'articles');
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const [, frontmatterRaw, content] = fileContent.split('---');
  
  // Parse frontmatter (simple YAML parsing)
  const metadata: any = {};
  frontmatterRaw.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^"|"$/g, '');
      metadata[key.trim()] = value;
    }
  });
  
  return {
    metadata: metadata as ArticleMetadata,
    content: content.trim()
  };
}
