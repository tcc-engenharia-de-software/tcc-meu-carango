import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./styles";
import { UseVehicleModel } from "../../models/types";

export const VehicleView: FC<UseVehicleModel> = ({
  onSubmit,
  formControl,
  isButtonSubmitDisabled,
  isLoading,
  handleInputChange,
}) => {
  return (
    <View className={styles.container}>
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          name="manufacturer"
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "Opção 1", value: "option1" },
                { label: "Opção 2", value: "option2" },
                { label: "Opção 3", value: "option3" },
              ]}
            />
          )}
        />
      </View>
    </View>
  );
};
