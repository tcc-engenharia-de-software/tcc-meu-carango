import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  HomeController,
  LoginController,
  SignUpController,
  VehicleController,
  VehicleDetailController,
} from "src/modules";

import { SCREEN_NAMES } from "./shared";

const Stack = createNativeStackNavigator();

const hideHeader = { headerShown: false };
export const EntryPoint = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={SCREEN_NAMES.Home}>
      <Stack.Screen
        name={SCREEN_NAMES.Login}
        component={LoginController}
        options={hideHeader}
      />

      <Stack.Screen
        name={SCREEN_NAMES.SignUp}
        component={SignUpController}
        options={hideHeader}
      />

      <Stack.Screen
        name={SCREEN_NAMES.Home}
        component={HomeController}
        options={hideHeader}
      />
      <Stack.Screen
        name={SCREEN_NAMES.vehicle}
        component={VehicleController}
        options={hideHeader}
      />
      <Stack.Screen
        name={SCREEN_NAMES.vehicleDetail}
        component={VehicleDetailController}
        options={hideHeader}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
