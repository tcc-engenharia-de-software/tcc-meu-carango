import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const handleNewVehicle = () => {
  console.log("zzz");
};

export const NewVehicle = () => {
  return (
    <View className="text-xl ml-4 mt-10">
      <TouchableOpacity
        className="border rounded-full p-2 w-20 border-gray-300 drop-shadow-xl"
        onPress={handleNewVehicle}>
        <Icon name="plus" color="#717171" size={60} />
      </TouchableOpacity>
    </View>
  );
};
