import { Controller as FormController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { UseLoginController } from "../../hooks/login";
import { styles } from "./styles";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

export const LoginView = ({
  onSubmit,
  formControl,
  isButtonSubmitDisabled,
  isLoading,
  emailError,
  passwordError,
  handleInputChange,
}: UseLoginController) => {
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
          rules={{
            required: true,
            maxLength: 120,
            minLength: 8,
            pattern: EMAIL_REGEX,
          }}
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
          rules={{ required: true, maxLength: 120, minLength: 8 }}
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

      <TouchableOpacity
        className={buttonSubmitStyle}
        onPress={onSubmit}
        testID="submit-button"
        disabled={isButtonSubmitDisabled}
      >
        <Text className={styles.form.submitButtonText}>
          {isLoading ? "..." : "Entrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
