import { getUser } from "@/app/actions";
import { FC } from "react";
import { Avatar } from "./avatar";
import { EditProfileButton } from "./edit-profile-button";
import { ToggleFollowButton } from "./toggle-follow-button";

interface UserProfileProps {
  isYourProfile?: boolean;
  id?: string;
  username?: string;
}

export const UserProfile: FC<UserProfileProps> = async ({
  isYourProfile,
  id,
  username,
}) => {
  const user = await getUser({ isYourProfile, id, username });

  if (!user) throw new Error("Profile not found");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-xl font-medium">{user.name}</h1>
          {user.username && (
            <p className="font-light text-sm text-primary/80">
              @{user.username}
            </p>
          )}
        </div>

        <Avatar src={user.image} alt={`Avatar of ${user.name}`} />
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-3 text-muted text-sm">
          <p>{user._count.followers} followers</p>
          <p>{user._count.following} following</p>
          <p>{user._count.posts} posts</p>
        </div>
        {user.bio && <p className="text-sm text-primary/80">{user.bio}</p>}
      </div>

      {isYourProfile ? (
        <EditProfileButton />
      ) : (
        <ToggleFollowButton
          targetUserId={user.id}
          isAlreadyFollowed={user.followers.length > 0}
        />
      )}
    </div>
  );
};
