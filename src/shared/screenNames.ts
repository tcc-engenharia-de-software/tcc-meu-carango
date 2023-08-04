import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const SCREEN_NAMES = {
  Home: "Home",
  Login: "Login",
  SignUp: "SignUp",
  Register: "Register",
  ForgotPassword: "ForgotPassword",
  ResetPassword: "ResetPassword",
  Vehicle: "Vehicle",
  VehicleDetail: "VehicleDetail",
  Maintenance: "Maintenance",
};

export type RootStackParamList = {
  Home: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  };
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Vehicle: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  };
  VehicleDetail: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  };
  Maintenance: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  };
};
