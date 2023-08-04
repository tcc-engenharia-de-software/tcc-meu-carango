import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FC, useState } from "react";
import { Controller as FormController } from "react-hook-form";
import { Header } from "src/components/Header";
// import { Picker } from "@react-native-picker/picker";
import { UseMaintenanceModel } from "../models/types";
import { styles } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";

export const MaintenanceView: FC<UseMaintenanceModel> = ({
  formControl,
  handleInputChange,
  isButtonSubmitDisabled,
  isLoading,
  onSubmit,
  setValue,
}) => {
  const [show, setShow] = useState(false);
  const buttonSubmitStyle = [
    styles.form.submitButton,
    isButtonSubmitDisabled
      ? styles.form.submitButtonDisabled
      : styles.form.submitButtonEnabled,
  ].join(" ");

  const onChangeDate = () => {
    setShow(!show);
  };

  return (
    <KeyboardAvoidingView className={styles.container}>
      <Header title="Manutenção" />
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          name="title"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextInput
              placeholder="Título da manutenção"
              testID="title"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value}
            />
          )}
        />
        {/* {manufacturerError ? (
          <Text className={styles.form.inputErrorText}>
            {manufacturerError}
          </Text>
        ) : null} */}
      </View>
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          name="value"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Valor em R$ 10,00"
              testID="model-vehicle"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value as unknown as string}
              inputMode="decimal"
            />
          )}
        />
      </View>
      {/* {modelError ? (
        <Text className={styles.form.inputErrorText}>{modelError}</Text>
      ) : null} */}
      <View className={styles.form.inputDatePicker}>
        <FormController
          control={formControl}
          name="Date"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Data da manutenção"
                onFocus={onChangeDate}
                onBlur={onChangeDate}
              />
              {show && <DateTimePicker value={value} />}
            </>
          )}
        />
      </View>
      {/* {yearError ? (
        <Text className={styles.form.inputErrorText}>{yearError}</Text>
      ) : null} */}

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          name="initialKilometer"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Quilometragem atual do veículo"
              testID="current_quilometer"
              onBlur={onBlur}
              inputMode="numeric"
              onChangeText={handleInputChange(onChange)}
            />
          )}
        />
        {/* {plateError ? (
          <Text className={styles.form.inputErrorText}>{plateError}</Text>
        ) : null} */}
      </View>
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          name="nextKilometerMaintenance"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Quilometragem para próxima manutenção"
              testID="future_quilometer"
              onBlur={onBlur}
              inputMode="numeric"
              onChangeText={handleInputChange(onChange)}
            />
          )}
        />
        {/* {plateError ? (
          <Text className={styles.form.inputErrorText}>{plateError}</Text>
        ) : null} */}
      </View>
      {/* <View className={styles.form.inputPicker}>
        <FormController
          control={formControl}
          name="nextDateMaintenance"
          render={({ field: { value } }) => <DateTimePicker value={value} />}
        />
      </View> */}
      {/* {fuelTypeError ? (
        <Text className={styles.form.inputErrorText}>{fuelTypeError}</Text>
      ) : null} */}
      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          name="details"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Detalhes da manutenção"
              testID="details"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value}
              numberOfLines={3}
            />
          )}
        />
      </View>
      {/* {initialKilometerError ? (
        <Text className={styles.form.inputErrorText}>
          {initialKilometerError}
        </Text>
      ) : null} */}

      <TouchableOpacity
        className={buttonSubmitStyle}
        onPress={onSubmit}
        testID="submit-button"
        disabled={isButtonSubmitDisabled}>
        <Text className={styles.form.submitButtonText}>ADICIONAR</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
