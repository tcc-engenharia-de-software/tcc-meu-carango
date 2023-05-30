import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";

import { LoginController, SignUpController, HomeController } from "src/modules";
import { Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList, SCREEN_NAMES } from "./shared";

const Page1: FC<RootStackParamList["Home"]> = ({ navigation }) => {
  return (
    <View className="bg-purple-100 flex-1 gap-4">
      <Text className="text-xl">
        Open up App.js to{" "}
        <Text className="text-red-600 font-bold">start working</Text> on your
        app!
      </Text>
      <Text className="text-xl">
        Changes you make will automatically reload.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="bg-red-500 py-4 px-8 rounded-xl self-center w-4/5">
        <Text className="text-white text-center">Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

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
