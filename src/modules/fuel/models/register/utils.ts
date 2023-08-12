import { FuelFieldsKeys, FuelRegisterFormData } from "./types";

export const getIntegerNumbers = (value: string) => {
  const REMOVE_NON_DIGITS_REGEX = /\D/g;

  return value?.replace(REMOVE_NON_DIGITS_REGEX, "");
};

export const caster: Record<
  FuelFieldsKeys,
  (value: string, isRaw?: boolean) => FuelRegisterFormData[FuelFieldsKeys]
> = {
  date_time: (value: string) => new Date(value),
  current_kilometer: (value: string) => Number(getIntegerNumbers(value)),
  fuel_type: (value: string) => value,
  liters: (value: string) => {
    const justNumbers = getIntegerNumbers(value);

    return Number(justNumbers);
  },
  price_per_liter: (value: string, isRaw = false) => {
    const justNumbers = Number(getIntegerNumbers(value));

    if (isRaw) {
      return justNumbers;
    }

    const CENTS_TO_REAL = 100;
    const valueWithCents = justNumbers / CENTS_TO_REAL;

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formatter.format(valueWithCents);
  },
  payment_method: (value: string) => value,
  additional_data: (value: string) => value,
  vehicle_id: (value: string) => value,
};
