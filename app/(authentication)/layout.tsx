import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

const AuthenticationLayout: FC<AuthenticationLayoutProps> = async ({
  children,
}) => {
  const session = await getSession();
  if (session?.user.username) redirect("/feed");

  return children;
};

export default AuthenticationLayout;
