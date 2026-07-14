import { getLikedPosts } from "@/app/(protected)/favorites/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteLikedPosts = () => {
  return useInfiniteQuery({
    queryKey: ["liked-posts"],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getLikedPosts(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
