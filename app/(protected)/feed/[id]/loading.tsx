import { LoadingSpinner, ProtectedLayout } from "@/components";

const SinglePostLoadingPage = () => {
  return (
    <ProtectedLayout showBackButton title="Thread">
      <LoadingSpinner />
    </ProtectedLayout>
  );
};

export default SinglePostLoadingPage;
