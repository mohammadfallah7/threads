import { getPosts } from "@/app/(protected)/feed/actions";
import { PostCard } from "./post-card";
import { LucideClipboard } from "lucide-react";

export const PostsList = async () => {
  const posts = await getPosts();

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard post={post} key={post.id} showPostActions isInFeedPage />
        ))
      ) : (
        <div className="flex items-center flex-col justify-center gap-3 text-center">
          <LucideClipboard className="size-12 text-muted" />
          <p className="text-primary/80">There is no post to show</p>
        </div>
      )}
    </div>
  );
};
