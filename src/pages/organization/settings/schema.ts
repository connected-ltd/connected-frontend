import { z } from "zod";

export const accountSchema = z.object({
  username: z
    .string()
    .email("Invalid email. Email must be a valid email address")
    .nonempty("Email is required"),
  company_name: z.string().nonempty("Company name is required"),
  address: z.string().nonempty("Address is required"),
  description: z.string().nonempty("Description is required"),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Minimum of 6 characters is required"),
    confirm_password: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type AccountSchema = z.infer<typeof accountSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
