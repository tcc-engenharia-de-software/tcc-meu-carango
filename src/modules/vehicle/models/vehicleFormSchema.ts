import { z } from "zod";

export const vehicleFormSchema = z.object({
  manufacturer: z.string().nonempty(),
  model: z.string().nonempty(),
  year: z.string().min(1),
  plate: z.string().regex(/^[A-Z]{3}-\d{4}$/),
  fuelType: z.array(z.string()),
  initialKilometer: z.string().min(0),
  color: z.string(),
  deleted: z.boolean().default(false),
});