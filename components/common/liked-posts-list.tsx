"use client";

import { useInfiniteLikedPosts } from "@/hooks";
import { LucideClipboard, LucideLoader2 } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react/jsx-runtime";
import { LoadingSpinner } from "../ui";
import { PostCard } from "./post-card";

export const LikedPostsList = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteLikedPosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.posts.length > 0 ? (
            page.posts.map((post) => (
              <PostCard
                post={post}
                key={post.id}
                showPostActions
                isInFeedPage
              />
            ))
          ) : (
            <div className="flex items-center flex-col justify-center gap-3 text-center">
              <LucideClipboard className="size-12 text-muted" />
              <p className="text-primary/80">There is no post to show</p>
            </div>
          )}
        </Fragment>
      ))}

      {isFetchingNextPage && (
        <div className="max-w-[140px] mx-auto py-3 flex items-center justify-center rounded-lg bg-background/70">
          <LucideLoader2 className="size-5 animate-spin text-muted" />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && <div className="h-10" ref={ref} />}
    </div>
  );
};
