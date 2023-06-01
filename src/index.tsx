import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginController, SignUpController, HomeController } from "src/modules";

import { SCREEN_NAMES } from "./shared";

const Stack = createNativeStackNavigator();

const hideHeader = { headerShown: false };
export const EntryPoint = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={SCREEN_NAMES.SignUp}>
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
    </Stack.Navigator>
  </NavigationContainer>
);
