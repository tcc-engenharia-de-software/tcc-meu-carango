import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { View, Text, Button, TouchableOpacity } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Page2: undefined;
};

const Page1 = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <View className="bg-purple-100 flex-1 gap-4">
      <Text className="text-xl">
        Open up App.js to{" "}
        <Text className="text-red-600 font-bold">start working</Text> on your
        app!
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Page2")}
        className="bg-red-500 py-4 px-8 rounded-xl self-center w-4/5"
      >
        <Text className="text-white text-center">Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

const Page2 = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => (
  <View className="bg-purple-100 flex-1 gap-4">
    <Text className="text-xl">
      hello world
      <Text className="text-red-600 font-bold">start working</Text> on your app!
    </Text>
    <Button title="Go to Page 1" onPress={() => navigation.navigate("Home")} />
  </View>
);

const Stack = createNativeStackNavigator();

const hideHeader = { headerShown: false };

export const EntryPoint = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Page1} options={hideHeader} />
      <Stack.Screen name="Page2" component={Page2} options={hideHeader} />
    </Stack.Navigator>
  </NavigationContainer>
);
