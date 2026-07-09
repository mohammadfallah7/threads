import { LucideLoader } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="text-muted gap-2 flex flex-col items-center justify-center py-4">
      <LucideLoader className="size-5 animate-spin" />
      <p className="text-xs">loading...</p>
    </div>
  );
};
