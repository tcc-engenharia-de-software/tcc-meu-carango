import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";

import { LoginController } from "src/modules";
import { SCREEN_NAMES } from "./shared";
import { HomeView } from "./modules/auth/views/home";
import { SignUpController } from "./modules/auth/controllers/signUp";

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
        component={HomeView}
        options={hideHeader}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
