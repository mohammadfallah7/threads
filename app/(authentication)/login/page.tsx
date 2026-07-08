import { getSession } from "@/app/actions";
import { AuthLayout, LoginForm } from "@/components";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getSession();
  if (session?.user) redirect("/setup-username");

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
