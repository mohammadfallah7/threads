"use client";

import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <div className="space-y-1 px-4 mb-20 md:mb-6">
      <div className="fixed top-0 z-150 right-0 left-0 h-15 flex items-center justify-center gap-3 bg-background/70 backdrop-blur-3xl">
        {showBackButton && (
          <LucideArrowLeft onClick={() => router.back()} className="size-4" />
        )}
        <h3 className="font-medium text-sm">{title}</h3>
      </div>

      <div className="mt-16 mx-auto max-w-xl border bg-surface border-border p-4 rounded-3xl">
        {children}
      </div>
    </div>
  );
};
