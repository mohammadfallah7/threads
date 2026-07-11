import { getSession } from "@/app/actions";
import {
  DesktopSidebar,
  EditProfileModal,
  MobileSidebar,
  ModalProvider,
  SessionProvider,
} from "@/components";
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
      <SessionProvider session={session}>
        <ModalProvider>
          {children}
          <EditProfileModal />
          <DesktopSidebar />
          <MobileSidebar />
        </ModalProvider>
      </SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
