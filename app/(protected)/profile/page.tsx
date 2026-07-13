import { LoadingSpinner, ProtectedLayout, UserProfile } from "@/components";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  return (
    <ProtectedLayout title="Profile">
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfile isYourProfile />
      </Suspense>
    </ProtectedLayout>
  );
};

export default ProfilePage;
