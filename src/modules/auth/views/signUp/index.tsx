import { FC } from "react";
import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { useSignUpModel } from "../../models/signUp/types";
import { styles } from "./styles";

export const SignUpView: FC<useSignUpModel> = ({
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
              secureTextEntry={true}
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
              secureTextEntry={true}
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
        disabled={isButtonSubmitDisabled}
      >
        <Text className={styles.form.submitButtonText}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <View>
        <Text className={styles.login.container}>
          Já tem cadastro?{" "}
          <TouchableOpacity>
            <Text onPress={() => navigateToLogin()} className="text-blue-800">
              Clique aqui
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
