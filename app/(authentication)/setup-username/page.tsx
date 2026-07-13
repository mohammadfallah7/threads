import { getSession } from "@/app/actions";
import { AuthLayout, SetupUsernameForm } from "@/components";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const SetupUsernamePage = async () => {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  return (
    <AuthLayout>
      <SetupUsernameForm email={session.user.email} />
    </AuthLayout>
  );
};

export default SetupUsernamePage;
