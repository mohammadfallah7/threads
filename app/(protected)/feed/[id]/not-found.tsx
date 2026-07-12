import { ProtectedLayout } from "@/components";
import { LucideMegaphone } from "lucide-react";

const SinglePostNotFoundPage = () => {
  return (
    <ProtectedLayout showBackButton title="Thread">
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <LucideMegaphone className="size-12 text-muted" />
        <h3 className="text-lg text-primary/80 font-bold tracking-wider">
          Post not found
        </h3>
      </div>
    </ProtectedLayout>
  );
};

export default SinglePostNotFoundPage;
