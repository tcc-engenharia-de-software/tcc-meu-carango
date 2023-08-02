import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface CardVehicleProps {
  name: string;
  plate: string;
  initialKilometer: string;
  idVehicle: number;
  clickCard: Function;
}

const DEFAULT_INITIAL_KILOMETER = 0;

export const CardVehicle: React.FC<CardVehicleProps> = ({
  name,
  plate,
  initialKilometer,
  idVehicle,
  clickCard,
}) => {
  const handleVehicleDetails = async () => {
    try {
      await AsyncStorage.setItem("@MeuCarango:vehiclekey", idVehicle + "");
      clickCard();
    } catch {
      Alert.alert("Erro ao salvar o veículo");
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
          Km Total: {initialKilometer || DEFAULT_INITIAL_KILOMETER}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
