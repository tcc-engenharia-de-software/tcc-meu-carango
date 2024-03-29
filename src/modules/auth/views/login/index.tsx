import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { UseLoginModel } from "../../models/login/types";
import { styles } from "./styles";

export const LoginView: FC<UseLoginModel> = ({
  onSubmit,
  formControl,
  isButtonSubmitDisabled,
  isLoading,
  emailError,
  passwordError,
  handleInputChange,
  redirectToRegister,
}) => {
  const buttonSubmitStyle = [
    styles.form.submitButton,
    isButtonSubmitDisabled
      ? styles.form.submitButtonDisabled
      : styles.form.submitButtonEnabled,
  ].join(" ");

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Entrar</Text>

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

      <TouchableOpacity
        className={buttonSubmitStyle}
        onPress={onSubmit}
        testID="submit-button"
        disabled={isButtonSubmitDisabled}>
        <Text className={styles.form.submitButtonText}>
          {isLoading ? "Carregando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={styles.registerButton.self}
        onPress={redirectToRegister}
        testID="go-to-sign-up-button">
        <Text className={styles.registerButton.text}>
          Ainda não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
};
