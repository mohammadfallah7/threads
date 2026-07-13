import { redirect } from "next/navigation";
import { getSession } from "./actions";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const session = await getSession();

  if (session?.user) redirect("/feed");
  else redirect("/login");
};

export default HomePage;
