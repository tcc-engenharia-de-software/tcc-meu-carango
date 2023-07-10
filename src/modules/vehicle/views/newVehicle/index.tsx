// import RNPickerSelect, { Item } from "react-native-picker-select";

import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Header } from "src/components/Header";
import { Picker } from "@react-native-picker/picker";
import { UseVehicleModel } from "../../models/types";
import { styles } from "./styles";

export const VehicleView: FC<UseVehicleModel> = ({
  onSubmit,
  formControl,
  isButtonSubmitDisabled,
  handleInputChange,
  fuelTypeError,
  initialKilometerError,
  manufacturerError,
  modelError,
  plateError,
  yearError,
  colorError,
  manufacturerItems,
  setValue,
}) => {
  const buttonSubmitStyle = [
    styles.form.submitButton,
    isButtonSubmitDisabled
      ? styles.form.submitButtonDisabled
      : styles.form.submitButtonEnabled,
  ].join(" ");

  return (
    <View className={styles.container}>
      <Header title="Adicionar veículo" />
      <View className={styles.form.inputPicker}>
        <FormController
          control={formControl}
          name="manufacturer"
          render={({ field: { value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) =>
                setValue("manufacturer", itemValue)
              }>
              {manufacturerItems.map(({ name, id }) => (
                <Picker.Item label={name} value={name} />
              ))}
            </Picker>
          )}
        />
        {manufacturerError ? (
          <Text className={styles.form.inputErrorText}>
            {manufacturerError}
          </Text>
        ) : null}
      </View>
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Modelo(EX.: Civic LX)"
              testID="model-vehicle"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value}
            />
          )}
          name="model"
        />
      </View>
      {modelError ? (
        <Text className={styles.form.inputErrorText}>{modelError}</Text>
      ) : null}
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Ano de fabricação"
              testID="year"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              keyboardType="numeric"
              value={value}
            />
          )}
          name="year"
        />
      </View>
      {yearError ? (
        <Text className={styles.form.inputErrorText}>{yearError}</Text>
      ) : null}

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Placa"
              testID="plate"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
            />
          )}
          name="plate"
        />
        {plateError ? (
          <Text className={styles.form.inputErrorText}>{plateError}</Text>
        ) : null}
      </View>
      <View className={styles.form.inputPicker}>
        <FormController
          control={formControl}
          name="fuelType"
          render={({ field: { value } }) => (
            <Picker
              selectedValue={(value: any) => console.log(value)}
              onValueChange={(itemValue) => console.log(itemValue)}>
              <Picker.Item label="Gasolina" value="gas" />
              <Picker.Item label="Diesel" value="die" />
              <Picker.Item label="Etanol" value="eta" />
            </Picker>
          )}
        />
      </View>
      {fuelTypeError ? (
        <Text className={styles.form.inputErrorText}>{fuelTypeError}</Text>
      ) : null}
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Quilometragem atual"
              testID="initialKilometer"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              keyboardType="numeric"
              value={value}
            />
          )}
          name="initialKilometer"
        />
      </View>
      {initialKilometerError ? (
        <Text className={styles.form.inputErrorText}>
          {initialKilometerError}
        </Text>
      ) : null}
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Cor"
              testID="color"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
            />
          )}
          name="color"
        />
      </View>
      {colorError ? (
        <Text className={styles.form.inputErrorText}>{colorError}</Text>
      ) : null}

      <TouchableOpacity
        className={buttonSubmitStyle}
        onPress={onSubmit}
        testID="submit-button"
        disabled={isButtonSubmitDisabled}>
        <Text className={styles.form.submitButtonText}>{"ADICIONAR"}</Text>
      </TouchableOpacity>
    </View>
  );
};
