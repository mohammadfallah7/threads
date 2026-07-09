export type User = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  image: string | null;
  bio: string | null;
  _count: { followers: number; following: number; posts: number };
};
