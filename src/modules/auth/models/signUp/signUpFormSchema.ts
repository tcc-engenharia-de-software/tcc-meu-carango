import { z } from "zod";

const MIN_LENGTH = 8;
const MAX_LENGTH = 120;

export const signUpFormSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(MIN_LENGTH, `Email deve ter no mínimo ${MIN_LENGTH} caracteres`)
    .max(MAX_LENGTH, `Email deve ter no máximo ${MAX_LENGTH} caracteres`),
  password: z
    .string()
    .min(MIN_LENGTH, `Senha deve ter no mínimo ${MIN_LENGTH} caracteres`)
    .max(MAX_LENGTH, `Senha deve ter no máximo ${MAX_LENGTH} caracteres`),
  confirmPassword: z
    .string()
    .min(MIN_LENGTH, `Senha deve ter no mínimo  ${MIN_LENGTH} caracteres`)
    .max(MAX_LENGTH, `Senha deve ter no máximo ${MAX_LENGTH} caracteres`),
});
