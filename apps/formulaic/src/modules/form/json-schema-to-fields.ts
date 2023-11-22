import { z } from "zod";
import { FieldProps, fieldSchema } from "./fields-schema";
import { generateId } from "../../lib/id";

const stringPropertySchema = z
  .object({
    type: z.literal("string"),
    minLength: z.number().optional().default(0),
    maxLength: z.number().optional().default(100),
  })
  .strict();

type JsonSchemaStringProperty = z.infer<typeof stringPropertySchema>;

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

const maps = {
  mapStringPropertyToField: (
    name: string,
    property: JsonSchemaStringProperty
  ): FieldProps => {
    return {
      id: generateId(),
      name,
      required: false,
      type: "text",
      rules: {
        minLength: property.minLength ?? 0,
        maxLength: property.maxLength ?? 0,
      },
    };
  },
  mapEmailPropertyToField: (
    name: string,
    property: z.infer<typeof emailPropertySchema>
  ): FieldProps => {
    return {
      id: generateId(),
      name,
      required: false,
      type: "email",
    };
  },
  mapNumberPropertyToField: (
    name: string,
    property: z.infer<typeof numberPropertySchema>
  ): FieldProps => {
    return {
      id: generateId(),
      name,
      required: false,
      type: "number",
      rules: {
        minimum: property.minimum ?? 0,
        maximum: property.maximum ?? 0,
      },
    };
  },
};

function mapObjectToField(name: string, input: unknown): FieldProps {
  const stringPropertyParseResult = stringPropertySchema.safeParse(input);
  if (stringPropertyParseResult.success) {
    return maps.mapStringPropertyToField(name, stringPropertyParseResult.data);
  } else {
    console.error(stringPropertyParseResult.error);
  }

  const emailPropertyParseResult = emailPropertySchema.safeParse(input);
  if (emailPropertyParseResult.success) {
    return maps.mapEmailPropertyToField(name, emailPropertyParseResult.data);
  } else {
    console.error(emailPropertyParseResult.error);
  }

  const numberPropertyParseResult = numberPropertySchema.safeParse(input);
  if (numberPropertyParseResult.success) {
    return maps.mapNumberPropertyToField(name, numberPropertyParseResult.data);
  } else {
    console.error(numberPropertyParseResult.error);
  }

  throw new Error("Unsupported property type");
}

const baseJsonSchema = z.object({
  type: z.literal("object"),
  properties: z.record(z.unknown()),
  required: z.array(z.string()).optional().default([]),
});

function overwriteFieldsWithRequired(
  fields: FieldProps[],
  requiredFields: string[]
): FieldProps[] {
  const updatedFields = fields.map((field) => {
    if (requiredFields.includes(field.name)) {
      return {
        ...field,
        required: true,
      };
    }

    return field;
  });

  return updatedFields;
}

export function buildFieldsFromJsonSchema(
  rawJsonSchema: unknown
): FieldProps[] {
  const jsonSchema = baseJsonSchema.parse(rawJsonSchema);

  const fields = Object.entries(jsonSchema.properties).map(
    ([name, rawProperty]) => {
      const field = mapObjectToField(name, rawProperty);

      return field;
    }
  );

  return overwriteFieldsWithRequired(fields, jsonSchema.required);
}
