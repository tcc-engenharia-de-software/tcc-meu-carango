import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { loginFormSchema } from "./loginFormSchema";
import type { LoginFormData } from "./types";

/*
  ! todo:
  - [x] install react-hook-form
  - [x] do logic to handle with form using react-hook-form
  - [ ] install supabase client
  - [ ] implement authentication with supabase
  - [ ] install lib to handle with async storage
  - [ ] save token in async storage
  - [ ] create a hook to handle with authentication
  - [x] install libs to handle with tests
  - [ ] create tests
  - [x] move types to separate file
*/
const initialFormValues: LoginFormData = { email: "", password: "" };
export const useLoginController = ({
  navigation,
}: RootStackParamList["Home"]) => {
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

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;
  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit((data: LoginFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    console.log(data);

    reset(initialFormValues);
    navigation.navigate(SCREEN_NAMES.Home as never);
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
