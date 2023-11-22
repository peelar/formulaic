import { Theme } from "@prisma/client";
import { z } from "zod";

export const formThemeSchema: z.ZodSchema<Theme> = z.enum([
  "MUI",
  "ANTD",
  "CHAKRA",
  "SEMANTIC",
]);

export const formCreateInputSchema = z.object({
  name: z.string(),
  schemaContent: z.record(z.any()),
  urls: z.array(z.string().url()),
  theme: formThemeSchema,
});

export type FormInput = z.infer<typeof formCreateInputSchema>;
