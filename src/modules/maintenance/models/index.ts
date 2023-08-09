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
  initialKilometer: "0",
  nextDateMaintenance: new Date(),
  nextKilometerMaintenance: "0",
  title: "",
  value: "0",
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
  const dateError = formState.errors.Date?.message;
  const detailsError = formState.errors.details?.message;
  const initialKilometerError = formState.errors.initialKilometer?.message;
  const nextDateMaintenanceError =
    formState.errors.nextDateMaintenance?.message;
  const nextKilometerMaintenanceError =
    formState.errors.nextKilometerMaintenance?.message;
  const titleError = formState.errors.title?.message;
  const valueError = formState.errors.value?.message;

  const onSubmit = handleSubmit(async (data: maintenanceFormData) => {
    console.log("chegooooooooooooooooooooooooooooooooooooooou");
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
    dateError,
    detailsError,
    initialKilometerError,
    nextDateMaintenanceError,
    nextKilometerMaintenanceError,
    titleError,
    valueError,
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
