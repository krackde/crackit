import { CATEGORIES, CATEGORY_ICONS } from "@/lib/categories";
import { getCategoryStats } from "@/lib/posts";
import Link from "next/link";

export default function CategoriesPage() {
  const stats = getCategoryStats();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-3">카테고리</h1>
      <p className="text-zinc-400 mb-10">주제별로 포스트를 모아봤습니다.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((key) => (
          <Link key={key} href={`/categories/${key}`} className="group">
            <div className="border border-zinc-800 rounded-xl p-6 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all">
              <div className="text-3xl mb-3">{CATEGORY_ICONS[key]}</div>
              <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {CATEGORIES[key]}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {stats[key]}개의 포스트
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
