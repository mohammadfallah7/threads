import { getSession } from "@/app/actions";
import { DesktopSidebar, MobileSidebar } from "@/components";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = async ({ children }) => {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  return (
    <div>
      {children}
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  );
};

export default ProtectedLayout;
