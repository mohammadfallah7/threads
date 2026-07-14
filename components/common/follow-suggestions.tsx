"use client";

import { useInfiniteFollowSuggestions } from "@/hooks";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react/jsx-runtime";
import { LoadingSpinner } from "../ui";
import { Avatar } from "./avatar";

export const FollowSuggestions = ({ query }: { query?: string }) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteFollowSuggestions(query);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.users.length > 0 ? (
            <ul className="space-y-6">
              {page.users.map((user) => (
                <li key={user.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar alt={`Avatar of ${user.name}`} src={user.image} />
                    <div className="text-sm">
                      {user.username && (
                        <Link
                          href={`/${user.username}`}
                          className="font-semibold hover:underline"
                        >
                          @{user.username}
                        </Link>
                      )}
                      <p className="text-muted">{user.name}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 text-muted text-sm">
                      <p>{user._count.followers} followers</p>
                      <p>{user._count.following} following</p>
                      <p>{user._count.posts} posts</p>
                    </div>
                    {user.bio && (
                      <p className="text-sm text-primary/80">{user.bio}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-muted">
              There is no user to follow
            </p>
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
