import { getPosts } from "@/app/(protected)/feed/actions";
import { PostCard } from "./post-card";

export const PostsList = async () => {
  const posts = await getPosts();

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} showPostActions isInFeedPage />
      ))}
    </div>
  );
};
