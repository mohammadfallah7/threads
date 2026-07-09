import { User } from "@/types";
import { FC } from "react";
import { Avatar } from "./avatar";

interface UserProfileProps {
  user: User;
}

export const UserProfile: FC<UserProfileProps> = ({ user }) => {
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

      <button className="border border-border w-full py-1 rounded-lg cursor-pointer hover:bg-surface-hover transition-colors duration-300">
        Edit Profile
      </button>
    </div>
  );
};
