import { z } from "zod";

const MIN_INITIAL_KILOMETER = 0;
const MAX_LENGTH_YEAR = 4;
const MAX_LENGTH_PLATE = 7;

export const vehicleFormSchema = z.object({
  manufacturer: z
    .string()
    .nonempty()
    .transform((value) => value.trim()),
  model: z
    .string()
    .nonempty()
    .transform((value) => value.trim()),
  year: z
    .string()
    .max(MAX_LENGTH_YEAR, { message: "máximo 4 dígitos" })
    .transform((value) => value.trim()),
  plate: z
    .string()
    .regex(/^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)
    .max(MAX_LENGTH_PLATE)
    .transform((value) => value.toUpperCase().trim()),
  fuel_type: z.string().transform((value) => value.trim()),
  initial_kilometer: z
    .string()
    .min(MIN_INITIAL_KILOMETER)
    .transform((value) => value.trim()),
  color: z.string().transform((value) => value.trim()),
  deleted: z.boolean().default(false),
});
