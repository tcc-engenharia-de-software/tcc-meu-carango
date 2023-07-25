import { User } from "@supabase/supabase-js";

export type AuthContextData = {
  isLoggedIn: boolean;
  user: User | null;
  signIn(credentials: LoginCredentials): Promise<void>;
  signUp(credentials: LoginCredentials): Promise<void>;
  signOut(): Promise<void>;
  getUser(): Promise<User | null>;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthState = Pick<AuthContextData, "isLoggedIn" | "user">;
