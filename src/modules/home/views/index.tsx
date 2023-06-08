import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { Header } from "src/components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type HomeTypes = {
  redirectToVehicleForm: Function;
};

export const HomeView: FC<HomeTypes> = ({ redirectToVehicleForm }) => {
  const handleNewVehicle = () => {
    redirectToVehicleForm();
  };

  return (
    <View>
      <Header title="Meu carango" description="Veículos" />
      <View className="text-xl ml-4 mt-10">
        <TouchableOpacity
          className="border rounded-full p-2 w-20 border-gray-300 drop-shadow-xl"
          onPress={handleNewVehicle}>
          <Icon name="plus" color="#717171" size={60} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
