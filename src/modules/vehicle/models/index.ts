import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { supabase } from "../../../services";
import { vehicleFormSchema } from "./vehicleFormSchema";
import type { vehicleFormData } from "./types";

const initialFormValues: vehicleFormData = {
  color: "",
  deleted: false,
  fuelType: ["Gasolina"],
  initialKilometer: 0,
  manufacturer: "Chevrolet",
  model: "teste",
  plate: "ODC9A21",
  year: 2014,
};
export const useVehicleModel = ({ navigation }: RootStackParamList["Home"]) => {
  const {
    control: formControl,
    formState,
    handleSubmit,
    reset,
  } = useForm<vehicleFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    resolver: zodResolver(vehicleFormSchema),
  });
  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data: vehicleFormData) => {
    console.log("bateu");
    if (isLoading || isButtonSubmitDisabled) return;

    const result = await supabase.from("vehicle").select();
    console.log(result);
    if (result.error) {
      return Alert.alert(
        "Ops...Aconteceu um erro",
        "Tente novamente mais tarde"
      );
    }

    reset(initialFormValues);
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
    onSubmit,
    handleInputChange,
  };
};
