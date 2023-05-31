import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { UseSignUpModel } from "../../models/signUp/types";
import { styles } from "./styles";

export const SignUpView: FC<UseSignUpModel> = ({
  onSubmit,
  formControl,
  isButtonSubmitDisabled,
  isLoading,
  emailError,
  passwordError,
  confirmPasswordError,
  handleInputChange,
  navigateToLogin,
}) => {
  const buttonSubmitStyle = [
    styles.form.submitButton,
    isButtonSubmitDisabled
      ? styles.form.submitButtonDisabled
      : styles.form.submitButtonEnabled,
  ].join(" ");
  return (
    <View className={styles.container}>
      <Text className={styles.title}>Criar conta</Text>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                ` ${emailError ? styles.form.inputError : ""}`
              }
              placeholder="Email"
              testID="email-input"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value}
            />
          )}
          name="email"
        />
        {emailError ? (
          <Text className={styles.form.inputErrorText}>{emailError}</Text>
        ) : null}
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                ` ${passwordError ? styles.form.inputError : ""}`
              }
              placeholder="Senha"
              secureTextEntry
              testID="password-input"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value}
            />
          )}
          name="password"
        />

        {passwordError ? (
          <Text className={styles.form.inputErrorText}>{passwordError}</Text>
        ) : null}
      </View>

      <View className={styles.form.inputWrapper}>
        <FormController
          control={formControl}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={
                styles.form.input +
                ` ${confirmPasswordError ? styles.form.inputError : ""}`
              }
              placeholder="Repetir senha"
              secureTextEntry
              testID="confirm-password-input"
              onBlur={onBlur}
              onChangeText={handleInputChange(onChange)}
              value={value}
            />
          )}
          name="confirmPassword"
        />

        {confirmPasswordError ? (
          <Text className={styles.form.inputErrorText}>
            {confirmPasswordError}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        className={buttonSubmitStyle}
        onPress={onSubmit}
        testID="submit-button"
        disabled={isButtonSubmitDisabled}>
        <Text className={styles.form.submitButtonText}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <View className={styles.login.container}>
        <Text>Já tem cadastro? </Text>
        <TouchableOpacity
          onPress={() => navigateToLogin()}
          className={styles.login.containerClickHere}>
          <Text className={styles.login.clickHere}>Clique aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
