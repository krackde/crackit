import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function PostsPage() {
  const posts = getSortedPostsData();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-10">모든 포스트</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/crackit/posts/${post.slug}`} className="group block">
              <article className="border border-zinc-800 rounded-xl p-5 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all">
                <time className="text-xs text-zinc-500">{post.date}</time>
                <h2 className="mt-1 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{post.title}</h2>
                {post.description && <p className="mt-1 text-sm text-zinc-400">{post.description}</p>}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">#{tag}</span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
