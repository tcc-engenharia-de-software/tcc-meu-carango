import { View, Text } from "react-native";

export const Bootstrap = () => {
  return (
    <View className="bg-purple-100 flex-1 gap-4">
      <Text className="text-xl">
        Open up App.js to{" "}
        <Text className="text-red-600 font-bold">start working</Text> on your
        app!
      </Text>
    </View>
  );
};
