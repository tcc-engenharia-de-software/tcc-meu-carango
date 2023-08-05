import { useFuelRegisterModel } from ".";

export type UseFuelRegisterModel = ReturnType<typeof useFuelRegisterModel>;

export type FuelRegisterFormData = {
  date_time: Date;
  current_kilometer: number;
  fuel_type: string;
  liters: number;
  price_per_liter: number;
  payment_method: string;
  additional_data?: string;
  vehicle_id: string;
};
