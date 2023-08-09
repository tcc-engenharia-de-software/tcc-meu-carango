import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Header } from "src/components/Header";
import { UseMaintenanceModel } from "../models/types";
import { styles } from "./styles";

export const MaintenanceView: FC<UseMaintenanceModel> = ({
  formControl,
  handleInputChange,
  isButtonSubmitDisabled,
  onSubmit,
  handlers,
  shouldShowDatePickerFuelRegister,
}) => {
  const buttonSubmitStyle = [
    styles.form.submitButton,
    isButtonSubmitDisabled
      ? styles.form.submitButtonDisabled
      : styles.form.submitButtonEnabled,
  ].join(" ");

  return (
    <ScrollView className={styles.container}>
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
              value={String(value)}
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
          render={({ field: { value, onChange } }) => (
            <>
              <Pressable onPress={handlers.datePickerFuelRegister.show}>
                <TextInput
                  placeholder="Data e hora"
                  testID="date-time-input"
                  value={String(value)}
                  editable={false}
                />
              </Pressable>

              {shouldShowDatePickerFuelRegister ? (
                <DateTimePicker
                  value={new Date()}
                  maximumDate={new Date()}
                  mode="date"
                  display="default"
                  testID="date-picker-fuel-register"
                  onChange={(_, selectedDate) => {
                    /**
                     * ! IMPORTANT NOTE:
                     * ! should close the date picker before set the value,
                     * ! to avoid open twice.
                     */
                    handlers.datePickerFuelRegister.hide();

                    if (!selectedDate) {
                      return;
                    }

                    onChange(selectedDate.toUTCString());
                  }}
                />
              ) : null}
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
              value={String(value)}
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
              value={String(value)}
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
        testID="submit-button">
        <Text className={styles.form.submitButtonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
