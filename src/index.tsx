import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  HomeController,
  LoginController,
  SignUpController,
  VehicleController,
  VehicleDetailController,
  MaintenanceController,
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
        name={SCREEN_NAMES.Vehicle}
        component={VehicleController}
        options={hideHeader}
      />
      <Stack.Screen
        name={SCREEN_NAMES.VehicleDetail}
        component={VehicleDetailController}
        options={hideHeader}
      />
      <Stack.Screen
        name={SCREEN_NAMES.Maintenance}
        component={MaintenanceController}
        options={hideHeader}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
