import { z } from "zod";

const DEFAULT_VALUE = "0";

export const maintenanceFormSchema = z.object({
  title: z
    .string()
    .nonempty()
    .transform((value) => value.trim()),
  value: z.string().default(DEFAULT_VALUE),
  Date: z.string(),
  initialKilometer: z.string(),
  nextKilometerMaintenance: z.string(),
  nextDateMaintenance: z.date(),
  details: z.string().transform((value) => value.trim()),
  deleted: z.boolean().default(false),
});
