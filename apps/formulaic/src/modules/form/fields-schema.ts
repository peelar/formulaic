import { z } from "zod";

const baseFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
});

const textFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("text"),
    rules: z.object({
      minLength: z.number().default(0),
      maxLength: z.number().default(100),
    }),
  })
);

export type TextFieldProps = z.infer<typeof textFieldSchema>;

const emailFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("email"),
  })
);

export type EmailFieldProps = z.infer<typeof emailFieldSchema>;

const numberFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("number"),
    rules: z.object({
      minimum: z.number().default(0),
      maximum: z.number().default(100),
    }),
  })
);

export type NumberFieldProps = z.infer<typeof numberFieldSchema>;

export const fieldSchema = z.union([
  textFieldSchema,
  emailFieldSchema,
  numberFieldSchema,
]);

export type FieldProps = z.infer<typeof fieldSchema>;

export type FieldType = FieldProps["type"];

export const typeGuards = {
  isFieldTypeText(type: FieldType): type is "text" {
    return type === "text";
  },
  isFieldTypeEmail(type: FieldType): type is "email" {
    return type === "email";
  },

  isFieldTypeNumber(type: FieldType): type is "number" {
    return type === "number";
  },
};
