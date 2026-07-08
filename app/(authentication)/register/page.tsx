import { getSession } from "@/app/actions";
import { AuthLayout, RegisterForm } from "@/components";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getSession();
  if (session?.user) redirect("/setup-username");

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
