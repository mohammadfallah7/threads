import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { getSession } from "./actions";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

const AuthenticationLayout: FC<AuthenticationLayoutProps> = async ({
  children,
}) => {
  const session = await getSession();
  if (session?.user.username) redirect("/");

  return children;
};

export default AuthenticationLayout;
