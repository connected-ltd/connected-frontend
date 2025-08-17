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

export const creditSchema = z.object({
  amount: z.number().min(200, "Amount should be larger than 200 naira"),
});

export type AccountSchema = z.infer<typeof accountSchema>;
export type CreditSchema = z.infer<typeof creditSchema>;
