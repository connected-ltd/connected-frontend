import { z } from "zod";

export const createMessageSchema = z.object({
  shortcode_id: z
    .number({ invalid_type_error: "Shortcode is required" })
    .int("Shortcode is required"),
  message: z.string().nonempty("Message is required"),
  area_id: z
    .number({ invalid_type_error: "Area is required" })
    .int("Area is required"),
});

export type CreateMessageSchema = z.infer<typeof createMessageSchema>;
