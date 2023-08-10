import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { supabase } from "src/services";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";

import { schemaPerField } from "./formSchema";
import { FuelFieldsKeys, FuelRegisterFormData } from "./types";

import { caster } from "./utils";

const initialFormValues: FuelRegisterFormData = {
  current_kilometer: 0,
  date_time: new Date(),
  fuel_type: "Gasolina",
  liters: 0,
  payment_method: "Dinheiro",
  price_per_liter: 100,
  vehicle_id: "",
  additional_data: "",
};

export const useFuelRegisterModel = ({
  navigation,
}: RootStackParamList["FuelSupply"]) => {
  const { control, formState, handleSubmit, reset, getValues, getFieldState } =
    useForm<FuelRegisterFormData>({
      defaultValues: initialFormValues,
      mode: "onChange",
    });

  const [shouldShowDatePickerFuelRegister, setShowDateFuelRegister] =
    useState(false);

  const getError = useCallback(
    (field: FuelFieldsKeys) => {
      const fieldData = getValues(field);

      if (!fieldData && !getFieldState(field).isDirty) {
        return;
      }

      const parsedData = caster[field](fieldData as string, true);
      const result = schemaPerField[field].safeParse(parsedData);

      if (result.success) {
        return;
      }

      const [{ message }] = result.error.issues;

      return message;
    },
    [getFieldState, getValues]
  );

  const hasSomeError = useMemo(
    () =>
      Object.keys(schemaPerField).some(
        (field) => !!getError(field as FuelFieldsKeys)
      ),
    [getError]
  );

  const isButtonSubmitDisabled =
    formState.isSubmitting || hasSomeError || !formState.isDirty;

  const isLoading = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data: FuelRegisterFormData) => {
    if (isLoading || isButtonSubmitDisabled) return;

    const castedData = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: caster[key as FuelFieldsKeys](value as string, true),
      }),
      {}
    );

    const { error } = await supabase.from("fuel_supply").insert(castedData);

    if (error) {
      Alert.alert(
        "Ops! Ocorreu um erro ao cadastrar o abastecimento.",
        "Verifique seus dados e tente novamente! " + error.message
      );
      return;
    }

    reset(initialFormValues);
    navigation.navigate(SCREEN_NAMES.Home as never);
  });

  const onChange = useCallback(
    (
      field: FuelFieldsKeys,
      value: string,
      cb: (value: FuelRegisterFormData[FuelFieldsKeys]) => void
    ) => {
      const parsedValue = caster[field](value);

      cb(String(parsedValue));
    },
    []
  );

  return {
    formState: {
      control,
      isLoading,
      isButtonSubmitDisabled,
      shouldShowDatePickerFuelRegister,
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
      change: onChange,
      datePickerFuelRegister: {
        show: () => setShowDateFuelRegister(true),
        hide: () => setShowDateFuelRegister(false),
      },
    },
  };
};
