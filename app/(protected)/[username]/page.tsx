import { ProtectedLayout, LoadingSpinner, UserProfile } from "@/components";
import { Suspense } from "react";

const UserProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  return (
    <ProtectedLayout title={username} showBackButton>
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfile username={username} />
      </Suspense>
    </ProtectedLayout>
  );
};

export default UserProfilePage;
