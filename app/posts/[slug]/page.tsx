import { getAllPostSlugs, getPostData } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <div>
      <Link href="/posts" className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors mb-8 inline-block">
        ← 목록으로
      </Link>
      <article>
        <header className="mb-10">
          <time className="text-sm text-zinc-500">{post.date}</time>
          <h1 className="mt-2 text-3xl font-bold text-white leading-tight">{post.title}</h1>
          {post.description && <p className="mt-3 text-zinc-400">{post.description}</p>}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">#{tag}</span>
              ))}
            </div>
          )}
        </header>
        <div
          className="prose prose-invert prose-zinc max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
