"use client";

import { useModal, useSelectedPost, useSession } from "@/hooks";
import { createImageURL } from "@/lib/utils";
import type { Post } from "@/types";
import clsx from "clsx";
import {
  LucideEllipsis,
  LucideMessageCircle,
  LucidePen,
  LucideTrash2,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { Avatar } from "./avatar";
import { LikeButton } from "./like-button";

interface PostCardProps {
  post: Post;
  showPostActions?: boolean;
  isInFeedPage?: boolean;
}

export const PostCard: FC<PostCardProps> = ({
  post,
  showPostActions,
  isInFeedPage,
}) => {
  const { session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const { openDeletePost, openCreateReply, openUpdatePost } = useModal();
  const { setSelectedPost } = useSelectedPost();

  const isUserPost = session?.user.id === post.author.id;
  const initialIsLiked = post.likes.length > 0;

  return (
    <div className="border-b border-border pb-4">
      <div className={clsx("space-y-3", { "px-3": isInFeedPage })}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              alt={`Avatar of ${post.author.name}`}
              src={post.author.image}
              size={40}
            />
            <Link
              href={isUserPost ? "/profile" : `/${post.author.username}`}
              className="font-medium"
            >
              @{post.author.username}
            </Link>
            <span className="text-muted text-sm">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          {isUserPost && isInFeedPage && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowMenu((prev) => !prev);
                }}
                className="text-muted cursor-pointer hover:text-primary transition-colors duration-300"
              >
                <LucideEllipsis className="size-5 " />
              </button>
              {showMenu && (
                <div className="absolute z-10 top-6 right-0 flex gap-4 flex-col p-3 rounded-lg bg-surface-hover">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedPost(post);
                      setShowMenu(false);
                      openDeletePost();
                    }}
                  >
                    <LucideTrash2 className="size-4" />
                  </button>
                  <div className="bg-primary/80 h-px w-full" />
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedPost(post);
                      setShowMenu(false);
                      openUpdatePost();
                    }}
                  >
                    <LucidePen className="size-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isInFeedPage ? (
          <Link href={`/feed/${post.id}`} className="space-y-3">
            {post.content && (
              <p className="wrap-break-word whitespace-pre-wrap text-primary/80 text-sm">
                {post.content}
              </p>
            )}

            {post.image && (
              <div className="relative aspect-square overflow-hidden rounded-xl h-80">
                <Image
                  alt={`Image of ${post.content || post.id}`}
                  src={createImageURL(post.image)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </Link>
        ) : (
          <>
            {post.content && (
              <p className="wrap-break-word whitespace-pre-wrap text-primary/80 text-sm">
                {post.content}
              </p>
            )}

            {post.image && (
              <div className="relative aspect-square overflow-hidden rounded-xl h-80">
                <Image
                  alt={`Image of ${post.content || post.id}`}
                  src={createImageURL(post.image)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </>
        )}

        {showPostActions && (
          <div
            className={clsx("flex items-center gap-4", {
              "mt-3": isInFeedPage,
            })}
          >
            <LikeButton
              initialLikeCount={post._count.likes}
              initialIsLiked={initialIsLiked}
              postId={post.id}
            />

            <button
              onClick={() => {
                setSelectedPost(post);
                openCreateReply();
              }}
              className="cursor-pointer flex items-center gap-1.5 text-muted hover:bg-surface-hover transition-all duration-300 px-3 py-2 rounded-full"
            >
              <LucideMessageCircle className="size-5" />
              <span className="text-xs">{post._count.comments}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
