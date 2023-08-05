import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { FUEL_TYPES, PAYMENT_METHODS } from "../../models/register/formSchema";
import { UseFuelRegisterModel } from "../../models/register/types";
import { styles } from "./styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const additionalDataPlaceholder = `Informações adicionais 

Exemplo: Número de notas fiscais, recibos emitidos, desempenho do veículo após o abastecimento ou qualquer coisa que considere importante.
`;

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
    return message ? styles.form.inputError : "";
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Abastecimento</Text>

      {/* do it works */}
      <RNDateTimePicker
        value={new Date()}
        maximumDate={new Date()}
        mode="date"
        display="default"
        testID="date-picker-fuel-register"
        onChange={(e) => {
          console.log(e.nativeEvent.timestamp);
        }}
      />

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder="Quilometragem atual do veículo"
              testID="current-kilometer-input"
              onBlur={onBlur}
              onChangeText={handlers.InputChange(onChange)}
              value={value ? String(value) : ""}
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
              selectedValue={value}
              onValueChange={handlers.InputChange(onChange)}>
              {FUEL_TYPES.map((name) => (
                <Picker.Item key={name} label={name} value={name} />
              ))}
            </Picker>
          )}
        />
        {formState.errors.current_kilometer ? (
          <Text className={styles.form.inputErrorText}>
            {formState.errors.current_kilometer}
          </Text>
        ) : null}
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formState.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder="Total de litros abastecido. Ex.: 16.29"
              testID="total-liters-input"
              onBlur={onBlur}
              onChangeText={handlers.InputChange(onChange)}
              value={value ? String(value) : ""}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder="Preço por litro. Ex.: R$ 5.29"
              testID="price-per-liters-input"
              onBlur={onBlur}
              onChangeText={handlers.InputChange(onChange)}
              value={value ? String(value) : ""}
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
              selectedValue={value}
              onValueChange={handlers.InputChange(onChange)}>
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
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                getStyleIfHasError(formState.errors.current_kilometer)
              }
              placeholder={additionalDataPlaceholder}
              testID="additional-data-input"
              onBlur={onBlur}
              onChangeText={handlers.InputChange(onChange)}
              value={value ? String(value) : ""}
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
    </View>
  );
};
