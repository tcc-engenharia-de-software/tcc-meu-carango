import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { UseVehicleModel } from "../../models/types";

export const LoginView: FC<UseVehicleModel> = ({
  onSubmit,
  formControl,
  isButtonSubmitDisabled,
  isLoading,
  handleInputChange,
}) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>Entrar</Text>
    </View>
  );
};
