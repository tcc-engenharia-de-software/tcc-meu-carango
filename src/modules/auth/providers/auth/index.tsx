import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { AuthContextData, AuthState, LoginCredentials } from "./types";
import { supabase } from "~/services";

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  const updateAuthState = (newAuthState: Partial<AuthState>) => {
    setAuthState((prevState) => ({
      ...prevState,
      ...newAuthState,
    }));
  };

  const signIn = useCallback(async (signInData: LoginCredentials) => {
    const response = await supabase.auth.signInWithPassword(signInData);

    if (response?.error) {
      throw new Error("Login failed");
    }

    const { user } = response.data;

    updateAuthState({ isLoggedIn: true, user });
  }, []);

  const signUp = useCallback(async (credentials: LoginCredentials) => {
    const response = await supabase.auth.signUp(credentials);

    if (response?.error) {
      throw new Error("Sign up failed");
    }

    const { user } = response.data;

    updateAuthState({ isLoggedIn: true, user });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();

    updateAuthState({
      isLoggedIn: false,
      user: null,
    });
  }, []);

  const getUser = useCallback(async () => {
    const loggedUser = await supabase.auth.getUser();

    if (loggedUser.error) {
      const currentUser = loggedUser.data.user;

      updateAuthState({
        isLoggedIn: true,
        user: currentUser,
      });

      return currentUser;
    }

    return null;
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      user: authState.user,
      signIn,
      signUp,
      signOut,
      getUser,
    }),
    [authState.isLoggedIn, authState.user, getUser, signIn, signOut, signUp]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
