import { z } from "zod";

export const FUEL_TYPES = ["Gasolina", "Etanol", "Diesel"] as const;
export const PAYMENT_METHODS = ["Dinheiro", "Cartão"] as const;

const MIN_VALUE_TO_CURRENT_KILOMETER = 0;
const MIN_VALUE_TO_LITERS = 0.01;

export const formSchema = z.object({
  date_time: z.date().min(new Date()),
  current_kilometer: z.number().min(MIN_VALUE_TO_CURRENT_KILOMETER),
  fuel_type: z.enum(FUEL_TYPES),
  liters: z.number().min(MIN_VALUE_TO_LITERS),
  price_per_liter: z.number(),
  payment_method: z.enum(PAYMENT_METHODS),
  additional_data: z.string().optional(),
  vehicle_id: z.string(),
});
