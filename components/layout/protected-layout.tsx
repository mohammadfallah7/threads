import { LucideArrowLeft } from "lucide-react";
import { FC, ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
}

export const ProtectedLayout: FC<ProtectedLayoutProps> = ({
  children,
  title,
  showBackButton,
}) => {
  return (
    <div className="space-y-1 px-4">
      <div className="flex items-center justify-center py-4 gap-3">
        {showBackButton && <LucideArrowLeft className="size-4" />}
        <h3 className="font-medium text-sm">{title}</h3>
      </div>

      <div className="mx-auto max-w-xl border bg-surface border-border p-4 rounded-3xl">
        {children}
      </div>
    </div>
  );
};
