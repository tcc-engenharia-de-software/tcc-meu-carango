import React from "react";
import { Button, Text, View } from "react-native";

import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  actionBackHome,
  actionTryAgain,
  error = false,
}) => {
  const handleBackHome = () => {
    actionBackHome();
  };
  const handleTryAgain = () => {
    actionTryAgain();
  };

  return (
    <View className="">
      <Text>{title}</Text>
      <Icon name="close" />
      <Text>{description}</Text>
      <Button title="Ir para tela principal" onPress={handleBackHome} />
      {error && <Button title="Tente novamente" onPress={handleTryAgain} />}
    </View>
  );
};
