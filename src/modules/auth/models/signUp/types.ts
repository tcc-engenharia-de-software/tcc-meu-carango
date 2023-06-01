import { z } from "zod";

import { signUpFormSchema } from "./signUpFormSchema";
import { useSignUpModel } from ".";

export type UseSignUpModel = ReturnType<typeof useSignUpModel>;

export type signUpFormData = z.infer<typeof signUpFormSchema>;
