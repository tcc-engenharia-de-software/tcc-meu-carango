import { z } from "zod";

import { vehicleFormSchema } from "./vehicleFormSchema";
import { useVehicleModel } from ".";

export type UseVehicleModel = ReturnType<typeof useVehicleModel>;

export type vehicleFormData = z.infer<typeof vehicleFormSchema>;
