import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";

import { Header } from "src/components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";

type HomeTypes = {
  redirectToVehicleForm: Function;
};

export const HomeView: FC<HomeTypes> = ({ redirectToVehicleForm }) => {
  const handleNewVehicle = () => {
    redirectToVehicleForm();
  };

  return (
    <View className={styles.home.container}>
      <Header title="Meu carango" description="Veículos" />
      <View className="text-xl mt-10">
        <TouchableOpacity
          className="border rounded-full p-2 w-20 border-gray-300 drop-shadow-xl"
          onPress={handleNewVehicle}>
          <Icon name="plus" color="#717171" size={60} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
