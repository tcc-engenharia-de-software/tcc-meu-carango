import { z } from "zod";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";

const configurationsSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});

export const configurations = configurationsSchema.parse({
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
});
