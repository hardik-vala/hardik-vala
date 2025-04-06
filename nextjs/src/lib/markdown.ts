import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { calculateReadingTimeInMinutes } from "./utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  content: string;
  readingTimeInMinutes: number;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith(".md")) // Only include .md files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      
      if (fs.statSync(fullPath).isDirectory()) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        author: data.author,
        content,
        readingTimeInMinutes: calculateReadingTimeInMinutes(content),
      };
    })
    .filter((post): post is Post => post !== null);

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    author: data.author,
    content,
    readingTimeInMinutes: calculateReadingTimeInMinutes(content),
  };
}
