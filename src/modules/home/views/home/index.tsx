import React from "react";
import { View } from "react-native";
import { Header } from "src/components/Header";
import { NewVehicle } from "src/components/NewVehicle";

export const HomeView: React.FC = () => {
  return (
    <View>
      <Header title="Meu carango" description="Veículos" />
      <NewVehicle />
    </View>
  );
};
