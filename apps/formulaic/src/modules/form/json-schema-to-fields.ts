import { z } from "zod";
import { FieldProps, fieldSchema } from "./fields-schema";
import { generateId } from "../../lib/id";
import { JsonProperty } from "./json-properties.schema";

const maps = {
  mapStringPropertyToField: (
    name: string,
    property: JsonProperty.String
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
  mapEmailPropertyToField: (name: string): FieldProps => {
    return {
      id: generateId(),
      name,
      required: false,
      type: "email",
    };
  },
  mapNumberPropertyToField: (
    name: string,
    property: JsonProperty.Number
  ): FieldProps => {
    return {
      id: generateId(),
      name,
      required: false,
      type: "number",
      rules: {
        minimum: property.minimum ?? 0,
        maximum: property.maximum ?? 100,
      },
    };
  },
  mapBooleanPropertyToField: (name: string): FieldProps => {
    return {
      id: generateId(),
      name,
      required: false,
      type: "boolean",
    };
  },
};

function mapObjectToField(name: string, input: unknown): FieldProps {
  const stringPropertyParseResult = JsonProperty.stringSchema.safeParse(input);
  if (stringPropertyParseResult.success) {
    return maps.mapStringPropertyToField(name, stringPropertyParseResult.data);
  }

  const emailPropertyParseResult = JsonProperty.emailSchema.safeParse(input);
  if (emailPropertyParseResult.success) {
    return maps.mapEmailPropertyToField(name);
  }

  const numberPropertyParseResult = JsonProperty.numberSchema.safeParse(input);
  if (numberPropertyParseResult.success) {
    return maps.mapNumberPropertyToField(name, numberPropertyParseResult.data);
  }

  const booleanPropertyParseResult =
    JsonProperty.booleanSchema.safeParse(input);
  if (booleanPropertyParseResult.success) {
    return maps.mapBooleanPropertyToField(name);
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
