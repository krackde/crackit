export const CATEGORIES = {
  devsecops: "DevSecOps",
  security: "보안 개념",
  news: "보안 뉴스",
  ctf: "알고리즘/CTF",
  tools: "환경/툴",
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_ICONS: Record<CategoryKey, string> = {
  devsecops: "🔐",
  security: "🛡️",
  news: "📰",
  ctf: "🧮",
  tools: "🛠️",
};
