import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";
import { FC } from "react";

import {
  fireEvent,
  render,
  renderHook,
  screen,
  act,
} from "@testing-library/react-native";

import { SCREEN_NAMES } from "~/shared";

beforeAll(() => {
  NativeWindStyleSheet.setOutput({ default: "native" });
});

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
  render as defaultRender,
  renderHook as defaultRenderHook,
  fireEvent,
  screen,
  act,
};
