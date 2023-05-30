import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { supabase } from "../../services";
import { signUpFormSchema } from "./signUpFormSchema";
import type { signUpFormData } from "./types";

/*
  ! todo:
  - [x] install react-hook-form
  - [x] do logic to handle with form using react-hook-form
  - [x] install supabase client
  - [x] implement authentication with supabase
  - [x] install lib to handle with async storage
  - [x] save token in async storage
  - [x] create a hook to handle with authentication
  - [x] install libs to handle with tests
  - [ ] create tests
  - [x] move types to separate file
*/
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

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;
  const confirmPasswordError = formState.errors.confirmPassword?.message;
  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data: signUpFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    const authentication = await supabase.auth.signUp(data);

    if (authentication.error) {
      return Alert.alert(
        "Credenciais incorretas",
        "Verifique seus dados e tente novamente!"
      );
    }

    reset(initialFormValues);
    navigation.navigate(SCREEN_NAMES.Home as never);
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
