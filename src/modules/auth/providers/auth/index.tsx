import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "../../../../services";
import { AuthContextData, AuthState, LoginCredentials } from "./types";

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    tokenJWT: null,
  });

  const updateAuthState = (newAuthState: Partial<AuthState>) => {
    setAuthState((prevState) => ({
      ...prevState,
      ...newAuthState,
    }));
  };

  const updateTokenJWT = useCallback(async () => {
    if (!authState.isLoggedIn) {
      return;
    }

    const tokenJWT = await supabase.auth
      .getSession()
      .then(({ data }) => data)
      .then(({ session }) => session?.access_token);

    updateAuthState({ tokenJWT });
  }, [authState.isLoggedIn]);

  const signIn = useCallback(
    async (signInData: LoginCredentials) => {
      const response = await supabase.auth.signInWithPassword(signInData);

      if (response?.error) {
        throw new Error("Login failed");
      }

      const { user } = response.data;
      await updateTokenJWT();

      updateAuthState({ isLoggedIn: true, user });
    },
    [updateTokenJWT]
  );

  const signUp = useCallback(async (credentials: LoginCredentials) => {
    const response = await supabase.auth.signUp(credentials);

    if (response?.error) {
      throw new Error("Sign up failed");
    }

    const { user } = response.data;

    updateAuthState({ isLoggedIn: true, user });
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Sign out failed");
    }

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

  useEffect(function checkIfUserIsLoggedIn() {
    const checkIfUserIsLoggedInClosure = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!error && data?.session) {
        const { access_token, user } = data.session;

        updateAuthState({
          isLoggedIn: true,
          tokenJWT: access_token,
          user,
        });
      }
    };

    checkIfUserIsLoggedInClosure();
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      user: authState.user,
      tokenJWT: authState.tokenJWT,
      signIn,
      signUp,
      signOut,
      getUser,
    }),
    [
      authState.isLoggedIn,
      authState.tokenJWT,
      authState.user,
      getUser,
      signIn,
      signOut,
      signUp,
    ]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
