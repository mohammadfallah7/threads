import { LikedPostsList, ProtectedLayout } from "@/components";

export const dynamic = "force-dynamic";

const FavoritesPage = async () => {
  return (
    <ProtectedLayout title="Favorites">
      <LikedPostsList />
    </ProtectedLayout>
  );
};

export default FavoritesPage;
