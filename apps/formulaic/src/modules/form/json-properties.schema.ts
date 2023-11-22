import { z } from "zod";

const stringPropertySchema = z
  .object({
    type: z.literal("string"),
    minLength: z.number().optional().default(0),
    maxLength: z.number().optional().default(100),
  })
  .strict();

const emailPropertySchema = z
  .object({
    type: z.literal("string"),
    format: z.literal("email"),
  })
  .strict();

const numberPropertySchema = z
  .object({
    type: z.literal("integer"),
    minimum: z.number().optional().default(0),
    maximum: z.number().optional().default(100),
  })
  .strict();

const booleanPropertySchema = z.object({ type: z.literal("boolean") }).strict();

export namespace JsonProperty {
  export type String = z.infer<typeof stringPropertySchema>;
  export type Email = z.infer<typeof emailPropertySchema>;
  export type Number = z.infer<typeof numberPropertySchema>;
  export type Boolean = z.infer<typeof booleanPropertySchema>;

  export const stringSchema = stringPropertySchema;
  export const emailSchema = emailPropertySchema;
  export const numberSchema = numberPropertySchema;
  export const booleanSchema = booleanPropertySchema;
}
