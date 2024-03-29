import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "src/modules/auth";
import { supabase } from "../../../services";
import type { vehicleFormData } from "./types";
import { vehicleFormSchema } from "./vehicleFormSchema";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";

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
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

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
      setIsError(true);
      setIsSuccess(false);
      // return Alert.alert(
      //   "Ops...Aconteceu um erro",
      //   "Tente novamente mais tarde"
      // );
      return;
    }
    setIsError(false);
    setIsSuccess(true);
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
    fuel_typeError,
    initialKilometerError,
    modelError,
    manufacturerError,
    yearError,
    colorError,
    manufacturerItems,
    setValue,
    isError,
    retry: () => {
      setIsError(false);
      setIsSuccess(false);
    },
    isSuccess,
    successAction: () => {
      navigation.navigate(SCREEN_NAMES.Home as never);
    },
  };
};
