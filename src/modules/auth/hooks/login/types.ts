import { z } from "zod";

import { loginFormSchema } from "./loginFormSchema";
import { useLoginController } from ".";

export type UseLoginController = ReturnType<typeof useLoginController>;

export type LoginFormData = z.infer<typeof loginFormSchema>;
