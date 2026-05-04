import { CATEGORIES, type CategoryKey } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((key) => ({ category: key }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!(category in CATEGORIES)) notFound();

  const key = category as CategoryKey;
  const posts = getPostsByCategory(key);
  const label = CATEGORIES[key];

  return (
    <div>
      <Link
        href="/categories"
        className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors mb-8 inline-block"
      >
        ← 카테고리 목록
      </Link>
      <h1 className="text-3xl font-bold text-white mb-2">{label}</h1>
      <p className="text-zinc-400 mb-10">{posts.length}개의 포스트</p>

      {posts.length === 0 ? (
        <p className="text-zinc-500">아직 포스트가 없습니다.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="group block">
                <article className="border border-zinc-800 rounded-xl p-5 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all">
                  <time className="text-xs text-zinc-500">{post.date}</time>
                  <h2 className="mt-1 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-1 text-sm text-zinc-400">{post.description}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
