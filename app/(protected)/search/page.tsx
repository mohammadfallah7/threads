import {
  FollowSearchInput,
  FollowSuggestions,
  ProtectedLayout,
} from "@/components";

export const dynamic = "force-dynamic";

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
        <FollowSuggestions query={query} />
      </div>
    </ProtectedLayout>
  );
};

export default SearchPage;
