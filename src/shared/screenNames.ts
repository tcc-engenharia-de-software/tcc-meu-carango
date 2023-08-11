import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const SCREEN_NAMES = {
  Home: "Home",
  Login: "Login",
  SignUp: "SignUp",
  Register: "Register",
  ForgotPassword: "ForgotPassword",
  ResetPassword: "ResetPassword",
  vehicle: "Vehicle",
  vehicleDetail: "vehicleDetail",
  fuel: {
    register: "FuelRegister",
  },
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
    navigation: NativeStackNavigationProp<RootStackParamList, "Vehicle">;
  };
  VehicleDetail: {
    navigation: NativeStackNavigationProp<RootStackParamList, "VehicleDetail">;
  };
  FuelSupply: {
    navigation: NativeStackNavigationProp<RootStackParamList, "FuelSupply">;
  };
};
