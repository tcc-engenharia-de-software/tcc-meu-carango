import { z } from "zod";

import { loginFormSchema } from "./loginFormSchema";
import { useLoginModel } from ".";

export type useLoginModel = ReturnType<typeof useLoginModel>;

export type LoginFormData = z.infer<typeof loginFormSchema>;
