import { PostCard, ProtectedLayout } from "@/components";
import { getLikedPosts } from "./actions";
import { LucideClipboard } from "lucide-react";

const FavoritesPage = async () => {
  const likedPosts = await getLikedPosts();

  return (
    <ProtectedLayout title="Favorites">
      <div className="space-y-4">
        {likedPosts.length > 0 ? (
          likedPosts.map((post) => (
            <PostCard post={post} key={post.id} showPostActions isInFeedPage />
          ))
        ) : (
          <div className="flex items-center flex-col justify-center gap-3 text-center">
            <LucideClipboard className="size-12 text-muted" />
            <p className="text-primary/80">There is no post to show</p>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
};

export default FavoritesPage;
