import { z } from "zod";

import { useLoginModel } from ".";
import { loginFormSchema } from "./loginFormSchema";

export type UseLoginModel = ReturnType<typeof useLoginModel>;

export type LoginFormData = z.infer<typeof loginFormSchema>;
