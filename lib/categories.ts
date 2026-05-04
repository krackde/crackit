export const CATEGORIES = {
  dev: "개발",
  algorithm: "알고리즘",
  cs: "CS",
  retrospect: "회고",
  tools: "환경/툴",
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_ICONS: Record<CategoryKey, string> = {
  dev: "💻",
  algorithm: "🧮",
  cs: "🖥️",
  retrospect: "📝",
  tools: "🛠️",
};
