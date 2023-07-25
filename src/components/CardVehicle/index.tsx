import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface CardVehicleProps {
  name: string;
  plate: string;
  initialKilometer: string;
  idVehicle: number;
}

export const CardVehicle: React.FC<CardVehicleProps> = ({
  name,
  plate,
  initialKilometer,
  idVehicle,
}) => {
  const handleVehicleDetails = async () => {
    try {
      await AsyncStorage.setItem("@MeuCarango:vehiclekey", idVehicle + "");
      console.log("Valor salvo no AsyncStorage.");
    } catch (error) {
      console.log("Erro ao salvar valor no AsyncStorage:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleVehicleDetails}>
      <View className="w-64 rounded-lg shadow-inner border border-gray-300 p-4 mx-2 mt-12">
        <Text className="text-xl">{name}</Text>
        <Text className="text-gray-500 mt-1">
          Placa: {plate.toLocaleUpperCase()}
        </Text>
        <Text className="text-gray-500 mt-1">
          Km Total: {initialKilometer || 0}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
