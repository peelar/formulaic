import { z } from "zod";

const basePropertySchema = z.object({
  title: z.string(),
  description: z.string(),
});

const stringPropertySchema = basePropertySchema
  .merge(
    z.object({
      type: z.literal("string"),
    })
  )
  .strict();

const emailPropertySchema = basePropertySchema
  .merge(
    z.object({
      type: z.literal("string"),
      format: z.literal("email"),
    })
  )
  .strict();

const numberPropertySchema = basePropertySchema
  .merge(
    z.object({
      type: z.literal("integer"),
      minimum: z.number().optional().default(0),
      maximum: z.number().optional().default(100),
    })
  )
  .strict();

const booleanPropertySchema = basePropertySchema
  .merge(z.object({ type: z.literal("boolean") }))
  .strict();

const datePropertySchema = basePropertySchema
  .merge(
    z.object({
      type: z.literal("string"),
      format: z.literal("date"),
    })
  )
  .strict();

const enumPropertySchema = basePropertySchema
  .merge(
    z.object({
      type: z.literal("string"),
      enum: z.array(z.string()),
    })
  )
  .strict();

export namespace JsonProperty {
  export type Base = z.infer<typeof basePropertySchema>;

  export type String = z.infer<typeof stringPropertySchema>;
  export type Email = z.infer<typeof emailPropertySchema>;
  export type Number = z.infer<typeof numberPropertySchema>;
  export type Boolean = z.infer<typeof booleanPropertySchema>;
  export type Date = z.infer<typeof datePropertySchema>;
  export type Enum = z.infer<typeof enumPropertySchema>;

  export const stringSchema = stringPropertySchema;
  export const emailSchema = emailPropertySchema;
  export const numberSchema = numberPropertySchema;
  export const booleanSchema = booleanPropertySchema;
  export const dateSchema = datePropertySchema;
  export const enumSchema = enumPropertySchema;
}
