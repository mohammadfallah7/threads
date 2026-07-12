import { PostCard, ProtectedLayout } from "@/components";
import { getPost } from "./actions";
import { notFound } from "next/navigation";

const SinglePostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  return (
    <ProtectedLayout showBackButton title="Thread">
      <PostCard post={post} showPostActions />
    </ProtectedLayout>
  );
};

export default SinglePostPage;
