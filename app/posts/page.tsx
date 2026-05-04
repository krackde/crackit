import { getSortedPostsData } from "@/lib/posts";
import PostList from "@/app/components/PostList";

export default function PostsPage() {
  const posts = getSortedPostsData();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-3">전체 포스트</h1>
      <p className="text-zinc-400 mb-10">{posts.length}개의 포스트</p>
      <PostList posts={posts} />
    </div>
  );
}
