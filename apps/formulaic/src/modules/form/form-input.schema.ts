import { Theme } from "@prisma/client";
import { z } from "zod";

const formThemeSchema: z.ZodSchema<Theme> = z.enum([
  "MUI",
  "ANTD",
  "CHAKRA",
  "SEMANTIC",
]);

const baseFormInputSchema = z.object({
  name: z.string(),
  urls: z.array(z.string().url()),
  theme: formThemeSchema,
});

const schemaContentSchema = z.object({
  schemaContent: z.record(z.any()),
});

const fullFormInputSchema = baseFormInputSchema.merge(schemaContentSchema);

export namespace FormInput {
  export const baseSchema = baseFormInputSchema;
  export const fullSchema = fullFormInputSchema;
  export const schemaContent = schemaContentSchema;
  export const themeSchema = formThemeSchema;

  export type FullSchema = z.infer<typeof fullSchema>;
  export type BaseSchema = z.infer<typeof baseSchema>;
  export type SchemaContentSchema = z.infer<typeof schemaContent>;
}
