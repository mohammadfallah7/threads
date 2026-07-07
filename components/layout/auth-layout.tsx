import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-sm w-full">{children}</div>
    </div>
  );
};
