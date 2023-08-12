import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { useAuth } from "src/modules/auth";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { supabase } from "../../../services";
import type { vehicleFormData } from "./types";
import { vehicleFormSchema } from "./vehicleFormSchema";

type ManufacturerItem = {
  created_at: string;
  id: number;
  name: string;
};

const initialFormValues: vehicleFormData = {
  color: "",
  deleted: false,
  fuel_type: "",
  initial_kilometer: "",
  manufacturer: "",
  model: "",
  plate: "",
  year: "",
};
export const useVehicleModel = ({
  navigation,
}: RootStackParamList["Vehicle"]) => {
  const {
    control: formControl,
    formState,
    handleSubmit,
    reset,
    setValue,
  } = useForm<vehicleFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    resolver: zodResolver(vehicleFormSchema),
  });

  const { user } = useAuth();

  const [manufacturerItems, setManufacturerItems] = useState<
    ManufacturerItem[]
  >([]);

  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;
  const plateError = formState.errors.plate?.message;
  const fuel_typeError = formState.errors.fuel_type?.message;
  const initialKilometerError = formState.errors.initial_kilometer?.message;
  const modelError = formState.errors.model?.message;
  const manufacturerError = formState.errors.manufacturer?.message;
  const yearError = formState.errors.year?.message;
  const colorError = formState.errors.color?.message;

  const onSubmit = handleSubmit(async (data: vehicleFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    const result = await supabase.from("vehicles").insert({
      ...data,
      user_id: user?.id,
    });

    if (result.error) {
      return Alert.alert(
        "Ops...Aconteceu um erro",
        "Tente novamente mais tarde"
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

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.from("manufacturer").select();

      if (!data) return;

      setManufacturerItems(data as any);
    };

    loadData();
  }, []);

  return {
    formControl,
    isLoading,
    isButtonSubmitDisabled,
    onSubmit,
    handleInputChange,
    plateError,
    fuel_typeError,
    initialKilometerError,
    modelError,
    manufacturerError,
    yearError,
    colorError,
    manufacturerItems,
    setValue,
  };
};
