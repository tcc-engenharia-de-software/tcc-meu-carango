import { FC, PropsWithChildren, createContext, useMemo } from "react";

import { AuthContextData } from "./types";

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const authContext = useMemo(
    () => ({
      signed: false,
      user: {},
      signIn: async () => {},
      signOut: () => {},
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
