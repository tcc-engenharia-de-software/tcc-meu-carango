import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react-native";
import { FC } from "react";
import { SCREEN_NAMES } from "src/shared";

const TestStack = createNativeStackNavigator();

const ControllerComponentWrapper = (
  Controller: FC,
  initialRouteName: keyof typeof SCREEN_NAMES
) => {
  return (
    <NavigationContainer>
      <TestStack.Navigator initialRouteName={initialRouteName}>
        <TestStack.Screen
          name={initialRouteName}
          component={Controller}
          options={{ headerShown: false }}
        />
      </TestStack.Navigator>
    </NavigationContainer>
  );
};

export {
  ControllerComponentWrapper,
  TestStack,
  act,
  render as defaultRender,
  renderHook as defaultRenderHook,
  fireEvent,
  screen,
};
