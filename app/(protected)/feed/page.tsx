import { FeedTopBar, PostsList, ProtectedLayout } from "@/components";

export const dynamic = "force-dynamic";

const FeedPage = () => {
  return (
    <ProtectedLayout title="For you">
      <div className="space-y-4">
        <FeedTopBar />
        <PostsList />
      </div>
    </ProtectedLayout>
  );
};

export default FeedPage;
