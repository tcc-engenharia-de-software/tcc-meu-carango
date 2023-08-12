import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FUEL_TYPES, PAYMENT_METHODS } from "../../models/register/formSchema";
import { UseFuelRegisterModel } from "../../models/register/types";
import { styles } from "./styles";

const FIRST_ITEM_INDEX = 1;

export const FuelRegisterView: FC<UseFuelRegisterModel> = ({
  formState,
  handlers,
}) => {
  const buttonSubmitStyle = [
    styles.form.submitButton,
    formState.isButtonSubmitDisabled
      ? styles.form.submitButtonDisabled
      : styles.form.submitButtonEnabled,
  ].join(" ");

  const getStyleIfHasError = (message?: string) => {
    return message ? ` ${styles.form.inputError}` : "";
  };

  return (
    <ScrollView className={styles.container}>
      <Text className={styles.title}>Abastecimento</Text>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          name="date_time"
          render={({ field: { name, value, onChange } }) => (
            <>
              <Pressable onPress={handlers.datePickerFuelRegister.show}>
                <TextInput
                  className={
                    styles.form.input +
                    getStyleIfHasError(formState.errors.date_time) +
                    " text-black"
                  }
                  placeholder="Data e hora"
                  testID="date-time-input"
                  value={String(value)}
                  editable={false}
                />
              </Pressable>

              {formState.shouldShowDatePickerFuelRegister ? (
                <RNDateTimePicker
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

                    handlers.change(name, selectedDate.toISOString(), onChange);
                  }}
                />
              ) : null}
            </>
          )}
        />
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder="Quilometragem atual do veículo"
              testID="current-kilometer-input"
              onBlur={onBlur}
              onChangeText={(text) => handlers.change(name, text, onChange)}
              value={String(value)}
              keyboardType="numeric"
            />
          )}
          name="current_kilometer"
        />
        {formState.errors.current_kilometer ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.current_kilometer}
          </Text>
        ) : null}
      </View>

      <View className={styles.form.inputPicker}>
        <FormController
          control={formState.control}
          name="fuel_type"
          render={({ field: { value, onChange } }) => (
            <Picker
              selectedValue={value ?? FUEL_TYPES.at(FIRST_ITEM_INDEX)}
              onValueChange={(itemValue) =>
                handlers.change("fuel_type", itemValue, onChange)
              }>
              {FUEL_TYPES.map((name) => (
                <Picker.Item key={name} label={name} value={name} />
              ))}
            </Picker>
          )}
        />
        {formState.errors.fuel_type ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.fuel_type}
          </Text>
        ) : null}
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder="Total de litros abastecido. Ex.: 16.29"
              testID="total-liters-input"
              onBlur={onBlur}
              onChangeText={(text) => handlers.change(name, text, onChange)}
              value={String(value)}
              keyboardType="decimal-pad"
              maxLength={8}
            />
          )}
          name="liters"
        />
        {formState.errors.liters ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.liters}
          </Text>
        ) : null}
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder="Preço por litro. Ex.: R$ 5.29"
              testID="price-per-liters-input"
              onBlur={onBlur}
              onChangeText={(text) => handlers.change(name, text, onChange)}
              value={String(value)}
              keyboardType="decimal-pad"
            />
          )}
          name="price_per_liter"
        />
        {formState.errors.price_per_liter ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.price_per_liter}
          </Text>
        ) : null}
      </View>

      <View className={styles.form.inputPicker}>
        <FormController
          control={formState.control}
          name="payment_method"
          render={({ field: { value, onChange } }) => (
            <Picker
              selectedValue={value ?? PAYMENT_METHODS.at(FIRST_ITEM_INDEX)}
              onValueChange={onChange}>
              {PAYMENT_METHODS.map((name) => (
                <Picker.Item key={name} label={name} value={name} />
              ))}
            </Picker>
          )}
        />
        {formState.errors.payment_method ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.payment_method}
          </Text>
        ) : null}
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextInput
              className={
                styles.form.input + getStyleIfHasError(formState.errors[name])
              }
              placeholder="Dados adicionais"
              testID="additional-data-input"
              onBlur={onBlur}
              onChangeText={(text) => handlers.change(name, text, onChange)}
              value={value}
              multiline
            />
          )}
          name="additional_data"
        />
        {formState.errors.additional_data ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.additional_data}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        className={buttonSubmitStyle}
        onPress={handlers.submit}
        testID="submit-button"
        disabled={formState.isButtonSubmitDisabled}>
        <Text className={styles.form.submitButtonText}>
          {formState.isLoading ? "Carregando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
