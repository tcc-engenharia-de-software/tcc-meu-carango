import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RootStackParamList } from "src/shared";
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
  fuelType: [""],
  initialKilometer: "",
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

  const [manufacturerItems, setManufacturerItems] = useState<
    ManufacturerItem[]
  >([]);

  const isButtonSubmitDisabled = !formState.isValid || formState.isSubmitting;
  const isLoading = formState.isSubmitting;
  const plateError = formState.errors.plate?.message;
  const fuelTypeError = formState.errors.fuelType?.message;
  const initialKilometerError = formState.errors.initialKilometer?.message;
  const modelError = formState.errors.model?.message;
  const manufacturerError = formState.errors.manufacturer?.message;
  const yearError = formState.errors.year?.message;
  const colorError = formState.errors.color?.message;

  const onSubmit = handleSubmit(async (data: vehicleFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    const result = await supabase.from("vehicle").insert([data]);

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
    fuelTypeError,
    initialKilometerError,
    modelError,
    manufacturerError,
    yearError,
    colorError,
    manufacturerItems,
    setValue,
  };
};
