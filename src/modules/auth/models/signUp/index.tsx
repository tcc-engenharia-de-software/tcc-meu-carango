import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { useAuth } from "../../hooks";

import { signUpFormSchema } from "./signUpFormSchema";
import type { signUpFormData } from "./types";

const initialFormValues: signUpFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};
export const useSignUpModel = ({ navigation }: RootStackParamList["Home"]) => {
  const {
    control: formControl,
    formState,
    handleSubmit,
    reset,
  } = useForm<signUpFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    resolver: zodResolver(signUpFormSchema),
  });

  const authentication = useAuth();

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;
  const confirmPasswordError = formState.errors.confirmPassword?.message;
  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data: signUpFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    try {
      await authentication.signUp(data);

      reset(initialFormValues);
      navigation.navigate(SCREEN_NAMES.Home as never);
    } catch {
      Alert.alert("Ops...Aconteceu um erro", "Tente novamente mais tarde");
    }
  });

  const handleInputChange = (cb: (text: string) => void) => {
    return (currentText: string) => {
      cb(currentText.trim());
    };
  };

  const navigateToLogin = () => {
    navigation.navigate(SCREEN_NAMES.Login as never);
  };

  return {
    formControl,
    isLoading,
    isButtonSubmitDisabled,
    emailError,
    passwordError,
    confirmPasswordError,
    onSubmit,
    handleInputChange,
    navigateToLogin,
  };
};
