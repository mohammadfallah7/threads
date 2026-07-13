import { LoadingSpinner, ProtectedLayout } from "@/components";

const FavoritesLoadingPage = () => {
  return (
    <ProtectedLayout title="Favorites">
      <LoadingSpinner />
    </ProtectedLayout>
  );
};

export default FavoritesLoadingPage;
