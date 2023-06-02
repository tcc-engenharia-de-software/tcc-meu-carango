// ! todo: update this type
export type AuthContextData = {
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  signOut(): void;
};
