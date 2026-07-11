import { getFollowSuggestions } from "@/app/(protected)/search/actions";
import { Avatar } from "./avatar";
import Link from "next/link";

export const FollowSuggestions = async ({ query }: { query?: string }) => {
  const followSuggestions = await getFollowSuggestions(query);

  return followSuggestions.length > 0 ? (
    <ul className="space-y-6">
      {followSuggestions.map((user) => (
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
            {user.bio && <p className="text-sm text-primary/80">{user.bio}</p>}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-sm text-muted">There is no user to follow</p>
  );
};
