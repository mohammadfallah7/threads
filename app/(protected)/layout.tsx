import { getSession } from "@/app/actions";
import {
  CreatePostModal,
  DeletePostModal,
  DesktopSidebar,
  EditProfileModal,
  MobileSidebar,
  ModalProvider,
  SelectedPostProvider,
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
        <SelectedPostProvider>
          <ModalProvider>
            {children}
            <EditProfileModal />
            <CreatePostModal />
            <DeletePostModal />
            <DesktopSidebar />
            <MobileSidebar />
          </ModalProvider>
        </SelectedPostProvider>
      </SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
