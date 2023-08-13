import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { SCREEN_NAMES } from "src/shared";

interface ResponseInfoError {
  title: string;
  description: string;
  actionBackHome: Function;
  actionTryAgain: Function;
  error: boolean;
}

export const ResponseInfo: React.FC<ResponseInfoError> = ({
  title,
  description,
  actionBackHome = () => {},
  actionTryAgain = () => {},
  error = false,
}) => {
  const navigation = useNavigation();

  const handleBackHome = () => {
    actionBackHome();
    navigation.navigate(SCREEN_NAMES.Home as never);
  };

  const handleTryAgain = () => {
    actionTryAgain();
  };

  return (
    <View className="flex flex-1 p-4">
      <Text className="text-[36px]">{title}</Text>

      <View className="flex flex-row justify-center my-6">
        {error ? (
          <Image source={require("../../../assets/responseInfo/error.png")} />
        ) : (
          <Image source={require("../../../assets/responseInfo/success.png")} />
        )}
      </View>

      <Text className="text-xl">{description}</Text>

      <TouchableOpacity
        onPress={handleBackHome}
        className="bg-black py-2 rounded-md mt-4">
        <Text className="text-xl text-white text-center font-bold p-2">
          Ir para tela principal
        </Text>
      </TouchableOpacity>

      {error && (
        <TouchableOpacity
          onPress={handleTryAgain}
          className="border-black border-2 py-2 rounded-md mt-3">
          <Text className="text-xl text-center font-bold p-2">
            Tente novamente
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
