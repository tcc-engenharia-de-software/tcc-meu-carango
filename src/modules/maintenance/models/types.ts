import { z } from "zod";
import { useMaintenanceModel } from ".";
import { maintenanceFormSchema } from "./maintenanceFormSchema";

export type UseMaintenanceModel = ReturnType<typeof useMaintenanceModel>;

export type maintenanceFormData = z.infer<typeof maintenanceFormSchema>;
