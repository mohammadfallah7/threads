import { getFollowSuggestions } from "@/app/(protected)/search/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteFollowSuggestions = (query?: string) => {
  return useInfiniteQuery({
    queryKey: query ? ["follow-suggestions", query] : ["follow-suggestions"],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getFollowSuggestions(query, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
