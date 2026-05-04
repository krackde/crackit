"use client";

import { CATEGORIES, CATEGORY_ICONS, type CategoryKey } from "@/lib/categories";
import type { PostMeta } from "@/lib/posts";
import Link from "next/link";
import { useState } from "react";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<CategoryKey | "all">("all");

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === "all"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          전체 {posts.length}
        </button>
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
          const count = posts.filter((p) => p.category === key).length;
          if (count === 0) return null;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === key
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {CATEGORY_ICONS[key]} {CATEGORIES[key]} {count}
            </button>
          );
        })}
      </div>

      {/* 포스트 목록 */}
      <ul className="space-y-4">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link href={`/crackit/posts/${post.slug}`} className="group block">
              <article className="border border-zinc-800 rounded-xl p-5 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <time className="text-xs text-zinc-500">{post.date}</time>
                  {post.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300">
                      {CATEGORY_ICONS[post.category]} {CATEGORIES[post.category]}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
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

      {filtered.length === 0 && (
        <p className="text-zinc-500 text-center py-10">포스트가 없습니다.</p>
      )}
    </div>
  );
}
