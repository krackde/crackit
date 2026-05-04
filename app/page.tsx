import { getSortedPostsData } from "@/lib/posts";
import PostList from "@/app/components/PostList";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">안녕하세요 👋</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          DevSecOps, 보안 개념, 최신 보안 뉴스를 공부하고 기록하는 블로그입니다.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-zinc-300 mb-6">포스트</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
