import { z } from "zod";

export const createMessageSchema = z.object({
  shortcode: z
    .string()
    .nonempty("Shortcode is required")
    .min(1, "Shortcode is required"),
  message: z.string().nonempty("Message is required"),
  area: z.string().nonempty("Area is required"),
});

export type CreateMessageSchema = z.infer<typeof createMessageSchema>;
