"use client";

import { getSession } from "@/app/actions";
import { createContext, FC, ReactNode } from "react";

type Session = Awaited<ReturnType<typeof getSession>>;

type SessionContextType = {
  session: Session;
};

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType,
);

interface SessionProviderProps {
  children: ReactNode;
  session: Session;
}

export const SessionProvider: FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
