import { z } from "zod";

// todo: add namespace

const baseFieldSchema = z.object({
  id: z.string(),
  required: z.boolean(),
  title: z.string().min(1),
  description: z.string(),
});

export type BaseFieldProps = z.infer<typeof baseFieldSchema>;

const textFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("text"),
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

const booleanFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("boolean"),
  })
);

export type BooleanFieldProps = z.infer<typeof booleanFieldSchema>;

const dateFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("date"),
  })
);

export type DateFieldProps = z.infer<typeof dateFieldSchema>;

const enumFieldSchema = baseFieldSchema.and(
  z.object({
    type: z.literal("enum"),
    options: z.array(z.string()),
  })
);

export type EnumFieldProps = z.infer<typeof enumFieldSchema>;

export const fieldSchema = z.union([
  textFieldSchema,
  emailFieldSchema,
  numberFieldSchema,
  booleanFieldSchema,
  dateFieldSchema,
  enumFieldSchema,
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
  isFieldTypeBoolean(type: FieldType): type is "boolean" {
    return type === "boolean";
  },
  isFieldTypeDate(type: FieldType): type is "date" {
    return type === "date";
  },
  isFieldTypeEnum(type: FieldType): type is "enum" {
    return type === "enum";
  },
};
