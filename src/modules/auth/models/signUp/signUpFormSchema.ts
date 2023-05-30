import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(8, "Email deve ter no mínimo 8 caracteres")
    .max(120, "Email deve ter no máximo 120 caracteres"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(120, "Senha deve ter no máximo 120 caracteres"),
  confirmPassword: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(120, "Senha deve ter no máximo 120 caracteres"),
});
