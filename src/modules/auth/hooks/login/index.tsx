import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { RootStackScreenProps } from "../../../../shared";

type UseLoginControllerProps = {
  navigation: RootStackScreenProps<"Home">["navigation"];
};

/*
  ! todo:
  - [x] install react-hook-form
  - [x] do logic to handle with form using react-hook-form
  - [ ] install supabase client
  - [ ] implement authentication with supabase
  - [ ] install lib to handle with async storage
  - [ ] save token in async storage
  - [ ] create a hook to handle with authentication
  - [ ] install libs to handle with tests
  - [ ] create tests
  - [ ] move types to separate file
*/
const initialFormValues = { email: "", password: "" };
export const useLoginController = ({ navigation }: UseLoginControllerProps) => {
  const { control, handleSubmit, formState, reset } = useForm<LoginFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    // resolver: undefined,
  });

  const onSubmit = handleSubmit((data: LoginFormData) => {
    console.log(data);

    reset(initialFormValues);
    navigation.push("Home");
  });

  const handleInputChange = (cb: (text: string) => void) => {
    return (currentText: string) => {
      cb(currentText.trim());
    };
  };

  const isButtonSubmitDisabled =
    !formState.isValid || formState.isSubmitting || formState.isDirty;

  const emailError = useMemo(() => {
    if (formState.errors.email?.type === "pattern") {
      return "Digite um email válido";
    }

    if (formState.errors.email?.type === "minLength") {
      return "Email deve ter no mínimo 8 caracteres";
    }

    if (formState.errors.email?.type === "maxLength") {
      return "Email deve ter no máximo 120 caracteres";
    }

    return null;
  }, [formState.errors.email]);

  const passwordError = useMemo(() => {
    if (formState.errors.password?.type === "minLength") {
      return "Senha deve ter no mínimo 8 caracteres";
    }

    if (formState.errors.password?.type === "maxLength") {
      return "Senha deve ter no máximo 120 caracteres";
    }

    return null;
  }, [formState.errors.password]);

  return {
    formControl: control,
    isLoading: formState.isSubmitting,
    isButtonSubmitDisabled,
    onSubmit,
    handleInputChange,
    emailError,
    passwordError,
  };
};

// it should be in a separate to be used as model
type LoginFormData = {
  email: string;
  password: string;
};

export type UseLoginController = ReturnType<typeof useLoginController>;
