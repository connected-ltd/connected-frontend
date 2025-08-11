import { z } from "zod";

export const accountSchema = z.object({
  username: z
    .string()
    .email("Invalid email. Email must be a valid email address")
    .optional(),
  phone: z.string().optional(),
  profile: z.string().optional(),
  description: z.string().optional(),
});

export type AccountSchema = z.infer<typeof accountSchema>;
