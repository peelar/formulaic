import { z } from "zod";
import {
  BaseFieldProps,
  BooleanFieldProps,
  DateFieldProps,
  EmailFieldProps,
  FieldProps,
  NumberFieldProps,
  TextFieldProps,
  fieldSchema,
} from "./fields-schema";
import { generateId } from "../../lib/id";
import { JsonProperty } from "./json-properties.schema";

const mapBaseProperty = (property: JsonProperty.Base): BaseFieldProps => {
  return {
    id: generateId(),
    required: false,
    title: property.title,
    description: property.description,
  };
};

const maps = {
  mapStringPropertyToField: (property: JsonProperty.String): TextFieldProps => {
    return {
      ...mapBaseProperty(property),
      type: "text",
    };
  },
  mapEmailPropertyToField: (property: JsonProperty.Email): EmailFieldProps => {
    return {
      ...mapBaseProperty(property),
      type: "email",
      title: property.title,
      description: property.description,
    };
  },
  mapNumberPropertyToField: (
    property: JsonProperty.Number
  ): NumberFieldProps => {
    return {
      ...mapBaseProperty(property),
      type: "number",
      rules: {
        minimum: property.minimum ?? 0,
        maximum: property.maximum ?? 100,
      },
    };
  },
  mapBooleanPropertyToField: (
    property: JsonProperty.Boolean
  ): BooleanFieldProps => {
    return {
      ...mapBaseProperty(property),
      type: "boolean",
    };
  },
  mapDatePropertyToField: (property: JsonProperty.Date): DateFieldProps => {
    return {
      ...mapBaseProperty(property),
      type: "date",
    };
  },
  mapEnumPropertyToField: (property: JsonProperty.Enum): FieldProps => {
    return {
      ...mapBaseProperty(property),
      type: "enum",
      options: property.enum,
    };
  },
};

function mapObjectToField(input: unknown): FieldProps {
  const stringPropertyParseResult = JsonProperty.stringSchema.safeParse(input);
  if (stringPropertyParseResult.success) {
    return maps.mapStringPropertyToField(stringPropertyParseResult.data);
  }

  const emailPropertyParseResult = JsonProperty.emailSchema.safeParse(input);
  if (emailPropertyParseResult.success) {
    return maps.mapEmailPropertyToField(emailPropertyParseResult.data);
  }

  const numberPropertyParseResult = JsonProperty.numberSchema.safeParse(input);
  if (numberPropertyParseResult.success) {
    return maps.mapNumberPropertyToField(numberPropertyParseResult.data);
  }

  const booleanPropertyParseResult =
    JsonProperty.booleanSchema.safeParse(input);
  if (booleanPropertyParseResult.success) {
    return maps.mapBooleanPropertyToField(booleanPropertyParseResult.data);
  }

  const datePropertyParseResult = JsonProperty.dateSchema.safeParse(input);
  if (datePropertyParseResult.success) {
    return maps.mapDatePropertyToField(datePropertyParseResult.data);
  }

  const enumPropertyParseResult = JsonProperty.enumSchema.safeParse(input);
  if (enumPropertyParseResult.success) {
    return maps.mapEnumPropertyToField(enumPropertyParseResult.data);
  }

  throw new Error("Unsupported property type");
}

function overwriteFieldsWithRequired(
  fields: FieldProps[],
  requiredFields: string[]
): FieldProps[] {
  const updatedFields = fields.map((field) => {
    if (requiredFields.includes(field.title)) {
      return {
        ...field,
        required: true,
      };
    }

    return field;
  });

  return updatedFields;
}

const baseJsonSchema = z.object({
  type: z.literal("object"),
  properties: z.record(z.unknown()),
  required: z.array(z.string()).optional().default([]),
});

export function buildFieldsFromJsonSchema(
  rawJsonSchema: unknown
): FieldProps[] {
  const jsonSchema = baseJsonSchema.parse(rawJsonSchema);

  const fields = Object.entries(jsonSchema.properties).map(
    ([name, rawProperty]) => {
      const field = mapObjectToField(rawProperty);

      return field;
    }
  );

  return overwriteFieldsWithRequired(fields, jsonSchema.required);
}
