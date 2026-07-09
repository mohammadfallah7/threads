import { getSession, getUserById } from "@/app/actions";
import { ProtectedLayout, UserProfile } from "@/components";

const ProfilePage = async () => {
  const session = await getSession();
  const user = await getUserById(session!.user.id);

  if (!user) throw new Error("Profile not found");

  return (
    <ProtectedLayout title="Profile">
      <UserProfile user={user} />
    </ProtectedLayout>
  );
};

export default ProfilePage;
