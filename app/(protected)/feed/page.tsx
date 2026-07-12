import {
  FeedTopBar,
  LoadingSpinner,
  PostsList,
  ProtectedLayout,
} from "@/components";
import { Suspense } from "react";

const FeedPage = () => {
  return (
    <ProtectedLayout title="For you">
      <div className="space-y-4">
        <FeedTopBar />
        <Suspense fallback={<LoadingSpinner />}>
          <PostsList />
        </Suspense>
      </div>
    </ProtectedLayout>
  );
};

export default FeedPage;
