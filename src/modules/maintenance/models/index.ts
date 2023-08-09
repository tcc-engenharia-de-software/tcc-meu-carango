import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RootStackParamList } from "src/shared";
import { supabase } from "../../../services";
import type { maintenanceFormData } from "./types";
import { maintenanceFormSchema } from "./maintenanceFormSchema";
import { useState } from "react";

const initialFormValues: maintenanceFormData = {
  Date: "",
  details: "",
  initialKilometer: 0,
  nextDateMaintenance: new Date(),
  nextKilometerMaintenance: 0,
  title: "",
  value: 0,
  deleted: false,
};
export const useMaintenanceModel = ({
  navigation,
}: RootStackParamList["Home"]) => {
  const {
    control: formControl,
    formState,
    handleSubmit,
    reset,
    setValue,
  } = useForm<maintenanceFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    resolver: zodResolver(maintenanceFormSchema),
  });

  const [shouldShowDatePickerFuelRegister, setShowDateFuelRegister] =
    useState(false);

  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;
  // const plateError = formState.errors.plate?.message;
  // const fuelTypeError = formState.errors.fuelType?.message;
  // const initialKilometerError = formState.errors.initialKilometer?.message;
  // const modelError = formState.errors.model?.message;
  // const manufacturerError = formState.errors.manufacturer?.message;
  // const yearError = formState.errors.year?.message;
  // const colorError = formState.errors.color?.message;

  const onSubmit = handleSubmit(async (data: maintenanceFormData) => {
    console.log({ data });
    if (isLoading || isButtonSubmitDisabled) return;

    const result = await supabase.from("maintenance").insert([data]);

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
    // plateError,
    // fuelTypeError,
    // initialKilometerError,
    // modelError,
    // manufacturerError,
    // yearError,
    // colorError,
    setValue,
    shouldShowDatePickerFuelRegister,
    handlers: {
      submit: onSubmit,
      datePickerFuelRegister: {
        show: () => setShowDateFuelRegister(true),
        hide: () => setShowDateFuelRegister(false),
      },
    },
  };
};
