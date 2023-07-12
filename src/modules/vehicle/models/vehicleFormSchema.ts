import { z } from "zod";

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
    .max(4, { message: "máximo 4 dígitos" })
    .transform((value) => value.trim()),
  plate: z
    .string()
    .regex(/^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)
    .max(7)
    .transform((value) => value.toUpperCase().trim()),
  fuelType: z.array(z.string().transform((value) => value.trim())),
  initialKilometer: z
    .string()
    .min(0)
    .transform((value) => value.trim()),
  color: z.string().transform((value) => value.trim()),
  deleted: z.boolean().default(false),
});
