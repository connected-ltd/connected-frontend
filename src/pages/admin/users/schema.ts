import { z } from "zod";

export const addUserSchema = z.object({
  number: z.string().nonempty("Number is required"),
  language: z.string().nonempty("Language is required"),
  area_id: z
    .number({ invalid_type_error: "Area is required" })
    .int("Area is required"),
});

export type AddUserSchema = z.infer<typeof addUserSchema>;
