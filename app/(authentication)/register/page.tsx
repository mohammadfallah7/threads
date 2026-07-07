import { AuthLayout, RegisterForm } from "@/components";
import { redirect } from "next/navigation";
import { getSession } from "../actions";

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
