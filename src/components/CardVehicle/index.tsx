import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

interface CardVehicleProps {
  name: string;
  plate: string;
  initialKilometer: string;
}

export const CardVehicle: React.FC<CardVehicleProps> = ({
  name,
  plate,
  initialKilometer,
}) => (
  <View className="w-64 rounded-lg shadow-inner border border-gray-300 p-4 mx-2 mt-3">
    <Text className="text-xl">{name}</Text>
    <Text className="text-gray-500 mt-1">Placa: {plate}</Text>
    <Text className="text-gray-500 mt-1">
      Km Total: {initialKilometer || 0}
    </Text>
  </View>
);
