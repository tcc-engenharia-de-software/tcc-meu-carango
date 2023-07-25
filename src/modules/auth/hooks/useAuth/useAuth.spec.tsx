import { useAuth } from "./index";

import { FC, PropsWithChildren, useMemo } from "react";
import { defaultRenderHook, faker } from "src/tests";

import { AuthContext, AuthProvider } from "../../providers";
import { AuthContextData } from "../../providers/auth/types";

const makeSutUseAuth = () => {
  const DefaultWrapper: FC<PropsWithChildren> = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  const wrapperOverride =
    ({
      isLoggedIn = false,
      user = undefined as any,
      signIn = jest.fn(),
      signUp = jest.fn(),
      signOut = jest.fn(),
    }) =>
    ({ children }: PropsWithChildren) =>
      (
        <AuthContext.Provider
          value={useMemo(
            () =>
              ({
                isLoggedIn,
                user,
                signIn,
                signUp,
                signOut,
              } as AuthContextData),
            []
          )}>
          {children}
        </AuthContext.Provider>
      );

  return {
    DefaultWrapper,
    wrapperOverride,
  };
};

describe("modules > auth > hooks > useAuth", () => {
  describe("isLogged", () => {
    it("should be true when user is authenticated", () => {
      const { result } = defaultRenderHook(() => useAuth(), {
        wrapper: makeSutUseAuth().wrapperOverride({
          isLoggedIn: true,
          user: {
            id: "1",
            email: faker.internet.email(),
          },
        }),
      });

      expect(result.current.isLoggedIn).toBeTruthy();
      expect(result.current.user).toBeTruthy();
    });

    it("should be false when user is not authenticated", () => {
      const { result } = defaultRenderHook(() => useAuth(), {
        wrapper: makeSutUseAuth().wrapperOverride({}),
      });

      expect(result.current.isLoggedIn).toBeFalsy();
      expect(result.current.user).toBeFalsy();
    });
  });
});
