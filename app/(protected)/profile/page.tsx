import { getSession } from "@/app/actions";
import { ProtectedLayout } from "@/components";
import Image from "next/image";

const ProfilePage = async () => {
  const session = await getSession();
  const user = session!.user;

  return (
    <ProtectedLayout title="Profile">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-medium">{user.name}</h1>
          {user.username && (
            <p className="font-light text-sm text-primary/80">
              @{user.username}
            </p>
          )}
        </div>

        <div className="relative rounded-full size-12 overflow-hidden">
          <Image
            src="/images/avatar.png"
            alt={`Avatar of ${user.name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default ProfilePage;
