import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { supabase } from "src/services";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { formSchema } from "./formSchema";
import { FuelRegisterFormData } from "./types";

const initialFormValues: Partial<FuelRegisterFormData> = {
  date_time: undefined,
  current_kilometer: undefined,
  fuel_type: undefined,
  liters: undefined,
  price_per_liter: undefined,
  payment_method: undefined,
  additional_data: undefined,
  vehicle_id: undefined,
};

export const useFuelRegisterModel = ({
  navigation,
}: RootStackParamList["FuelSupply"]) => {
  const { control, formState, handleSubmit, reset } =
    useForm<FuelRegisterFormData>({
      defaultValues: initialFormValues,
      mode: "onChange",
      resolver: zodResolver(formSchema),
    });

  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data: FuelRegisterFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    try {
      await supabase.from("fuel_supply").insert(data);

      reset(initialFormValues);
      navigation.navigate(SCREEN_NAMES.Home as never);
    } catch {
      Alert.alert(
        "Ops! Ocorreu um erro ao cadastrar o abastecimento.",
        "Verifique seus dados e tente novamente!"
      );
    }
  });

  const handleInputChange = (cb: (text: string) => void) => {
    return (currentText: string) => {
      cb(currentText);
    };
  };

  const getError = (field: keyof FuelRegisterFormData) => {
    return formState.errors[field]?.message;
  };

  return {
    formState: {
      control,
      isLoading,
      isButtonSubmitDisabled,
      errors: {
        date_time: getError("date_time"),
        current_kilometer: getError("current_kilometer"),
        fuel_type: getError("fuel_type"),
        liters: getError("liters"),
        price_per_liter: getError("price_per_liter"),
        payment_method: getError("payment_method"),
        additional_data: getError("additional_data"),
        vehicle_id: getError("vehicle_id"),
      },
    },
    handlers: {
      submit: onSubmit,
      InputChange: handleInputChange,
    },
  };
};
