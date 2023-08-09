import { format } from "date-fns";
import { z } from "zod";

const DEFAULT_VALUE = 0;

export const maintenanceFormSchema = z.object({
  title: z
    .string()
    .nonempty()
    .transform((value) => value.trim()),
  value: z.number().default(DEFAULT_VALUE),
  Date: z
    .date()
    .transform((date) => (date ? format(new Date(date), "dd-MM-yyyy") : date)),
  initialKilometer: z.number().min(DEFAULT_VALUE),
  nextKilometerMaintenance: z.number().min(DEFAULT_VALUE),
  nextDateMaintenance: z.date(),
  details: z.string().transform((value) => value.trim()),
  deleted: z.boolean().default(false),
});
