import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const SCREEN_NAMES = {
  Home: "Home",
  Login: "Login",
  SignUp: "SignUp",
  Register: "Register",
  ForgotPassword: "ForgotPassword",
  ResetPassword: "ResetPassword",
  vehicle: "Vehicle",
};

export type RootStackParamList = {
  Home: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  };
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Vehicle: undefined;
};
