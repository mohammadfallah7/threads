import { CommentsList, PostCard, ProtectedLayout } from "@/components";
import { getComments, getPost } from "./actions";
import { notFound } from "next/navigation";

const SinglePostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

  if (!post) notFound();

  return (
    <ProtectedLayout showBackButton title="Thread">
      <PostCard post={post} showPostActions />
      <CommentsList comments={comments} />
    </ProtectedLayout>
  );
};

export default SinglePostPage;
