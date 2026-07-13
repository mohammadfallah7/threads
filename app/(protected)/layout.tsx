import { getSession } from "@/app/actions";
import {
  CreatePostModal,
  CreateReplyModal,
  DeleteCommentModal,
  DeletePostModal,
  DesktopSidebar,
  EditProfileModal,
  MobileSidebar,
  ModalProvider,
  SelectedCommentProvider,
  SelectedPostProvider,
  SessionProvider,
  UpdateCommentModal,
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
          <SelectedCommentProvider>
            <ModalProvider>
              {children}
              <EditProfileModal />
              <CreatePostModal />
              <DeletePostModal />
              <CreateReplyModal />
              <DeleteCommentModal />
              <UpdateCommentModal />
              <DesktopSidebar />
              <MobileSidebar />
            </ModalProvider>
          </SelectedCommentProvider>
        </SelectedPostProvider>
      </SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
