import {
  FollowSearchInput,
  FollowSuggestions,
  LoadingSpinner,
  ProtectedLayout,
} from "@/components";
import { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <ProtectedLayout title="Search">
      <div className="space-y-4">
        <FollowSearchInput />
        <h1 className="text-muted font-medium">Follow Suggestions</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <FollowSuggestions query={query} />
        </Suspense>
      </div>
    </ProtectedLayout>
  );
};

export default SearchPage;
