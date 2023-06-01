import React, { FC } from "react";
import { View } from "react-native";
import { Header } from "src/components/Header";
import { NewVehicle } from "src/components/Vehicle";

export const HomeView: FC = () => {
  return (
    <View>
      <Header title="Meu carango" description="Veículos" />
      <NewVehicle />
    </View>
  );
};
