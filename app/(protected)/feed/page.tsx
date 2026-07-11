import { FeedTopBar, ProtectedLayout } from "@/components";

const FeedPage = () => {
  return (
    <ProtectedLayout title="For you">
      <FeedTopBar />
    </ProtectedLayout>
  );
};

export default FeedPage;
