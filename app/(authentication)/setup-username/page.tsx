import { AuthLayout, SetupUsernameForm } from "@/components";
import { getSession } from "../actions";
import { redirect } from "next/navigation";

const SetupUsernamePage = async () => {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  return (
    <AuthLayout>
      <SetupUsernameForm />
    </AuthLayout>
  );
};

export default SetupUsernamePage;
