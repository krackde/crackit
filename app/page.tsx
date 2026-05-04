import { getSortedPostsData } from "@/lib/posts";
import PostList from "@/app/components/PostList";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">안녕하세요 👋</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          개발, CS, 알고리즘을 공부하고 기록하는 테크 블로그입니다.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-zinc-300 mb-6">포스트</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
