import { z } from "zod";

import { RootStackScreenProps } from "../../../../shared";
import { loginFormSchema } from "./loginFormSchema";
import { useLoginController } from ".";

export type UseLoginControllerProps = {
  navigation: RootStackScreenProps<"Home">["navigation"];
};

export type UseLoginController = ReturnType<typeof useLoginController>;

export type LoginFormData = z.infer<typeof loginFormSchema>;
