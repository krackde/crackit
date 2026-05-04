import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { CATEGORIES, type CategoryKey } from "./categories";
export type { CategoryKey } from "./categories";
export { CATEGORIES } from "./categories";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  category?: CategoryKey;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getSortedPostsData(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        category: data.category ?? undefined,
      } as PostMeta;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getPostsByCategory(category: CategoryKey): PostMeta[] {
  return getSortedPostsData().filter((post) => post.category === category);
}

export function getCategoryStats(): Record<CategoryKey, number> {
  const posts = getSortedPostsData();
  const stats = {} as Record<CategoryKey, number>;
  for (const key of Object.keys(CATEGORIES) as CategoryKey[]) {
    stats[key] = posts.filter((p) => p.category === key).length;
  }
  return stats;
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    category: data.category ?? undefined,
    contentHtml,
  };
}
