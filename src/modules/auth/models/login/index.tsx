import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { useAuth } from "../../hooks";

import { loginFormSchema } from "./loginFormSchema";
import type { LoginFormData } from "./types";
import { useEffect } from "react";

const initialFormValues: LoginFormData = {
  email: "",
  password: "",
};
export const useLoginModel = ({ navigation }: RootStackParamList["Home"]) => {
  const {
    control: formControl,
    formState,
    handleSubmit,
    reset,
  } = useForm<LoginFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const authentication = useAuth();

  useEffect(
    function redirectToHomeIfLogged() {
      if (authentication.isLoggedIn) {
        navigation.navigate(SCREEN_NAMES.Home as never);
      }
    },
    [authentication.isLoggedIn, navigation]
  );

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;
  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data: LoginFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    try {
      await authentication.signIn(data);

      reset(initialFormValues);
      navigation.navigate(SCREEN_NAMES.Home as never);
    } catch {
      Alert.alert(
        "Credenciais incorretas",
        "Verifique seus dados e tente novamente!"
      );
    }
  });

  const handleInputChange = (cb: (text: string) => void) => {
    return (currentText: string) => {
      cb(currentText.trim());
    };
  };

  return {
    formControl,
    isLoading,
    isButtonSubmitDisabled,
    emailError,
    passwordError,
    onSubmit,
    handleInputChange,
  };
};
