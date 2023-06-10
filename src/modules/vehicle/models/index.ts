import { Alert } from "react-native";
import { RootStackParamList } from "src/shared";
import { supabase } from "../../../services";
import { useForm } from "react-hook-form";
import type { vehicleFormData } from "./types";
import { vehicleFormSchema } from "./vehicleFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type ManufacturerItem = {
  label: string;
  value: string;
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

  const getManufacturerItems = async () => {
    const { data } = await supabase.from("manufacturer").select();

    const parseItems = (data || []).map((item, index) => {
      return { label: item.name, value: item.name };
    });

    return [parseItems];
  };

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
    getManufacturerItems,
  };
};
