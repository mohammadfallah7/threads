import { SessionContext } from "@/components";
import { useContext } from "react";

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("Wrap your component inside SessionProvider component");
  }

  return context;
};
