import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View, Text, Button, TouchableOpacity } from "react-native";
import { SCREEN_NAMES, type RootStackScreenProps } from "./shared";

const Page1 = ({ navigation }: RootStackScreenProps<"Home">) => {
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
        className="bg-red-500 py-4 px-8 rounded-xl self-center w-4/5"
      >
        <Text className="text-white text-center">Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

const Page2 = ({ navigation }: RootStackScreenProps<"Login">) => (
  <View className="bg-purple-100 flex-1 gap-4">
    <Text className="text-xl">
      hello world
      <Text className="text-red-600 font-bold">start working</Text> on your app!
    </Text>
    <Button title="Go to Page 1" onPress={() => navigation.navigate("Home")} />
  </View>
);

const Stack = createNativeStackNavigator();

const defaultOption = { headerShown: false };

export const EntryPoint = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={SCREEN_NAMES.Home}>
      <Stack.Screen
        name={SCREEN_NAMES.Home}
        component={Page1}
        options={defaultOption}
      />
      <Stack.Screen
        name={SCREEN_NAMES.Login}
        component={Page2}
        options={defaultOption}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
