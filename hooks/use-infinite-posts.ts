import { getPosts } from "@/app/(protected)/feed/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getPosts(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
