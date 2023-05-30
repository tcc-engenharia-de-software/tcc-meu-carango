import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";
import { z } from "zod";

const configurationsSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});

export const configurations = configurationsSchema.parse({
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
});
