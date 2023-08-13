import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  FuelRegisterController,
  HomeController,
  LoginController,
  SignUpController,
  VehicleController,
  VehicleDetailController,
} from "src/modules";

import { SCREEN_NAMES } from "./shared";
import { TopBar } from "./components/TopBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./modules/auth/hooks";

const Stack = createNativeStackNavigator();

const overrideNavigationTheme = {
  colors: { ...DefaultTheme.colors, background: "#fff" },
  dark: DefaultTheme.dark,
};

const hideHeader = { headerShown: false };
const customHeader = { header: TopBar };

export const EntryPoint = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer theme={overrideNavigationTheme}>
      <Stack.Navigator initialRouteName={SCREEN_NAMES.Home}>
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            <Stack.Screen
              name={SCREEN_NAMES.Home}
              component={HomeController}
              options={customHeader}
            />

            <Stack.Screen
              name={SCREEN_NAMES.vehicle}
              component={VehicleController}
              options={customHeader}
            />
            <Stack.Screen
              name={SCREEN_NAMES.vehicleDetail}
              component={VehicleDetailController}
              options={customHeader}
            />
            <Stack.Screen
              name={SCREEN_NAMES.fuel.register}
              component={FuelRegisterController}
              options={customHeader}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
