import { words } from "../../lib/words";
import {
  BooleanFieldProps,
  DateFieldProps,
  EmailFieldProps,
  EnumFieldProps,
  FieldProps,
  NumberFieldProps,
  TextFieldProps,
  typeGuards,
} from "./fields-schema";
import { JsonProperty } from "./json-properties.schema";

const jsonSchemaFieldFactory = {
  text: (props: TextFieldProps): JsonProperty.String => {
    return {
      type: "string",
      title: props.title,
      description: props.description,
    };
  },
  email: (props: EmailFieldProps): JsonProperty.Email => {
    return {
      type: "string",
      format: "email",
      title: props.title,
      description: props.description,
    };
  },
  number: (props: NumberFieldProps): JsonProperty.Number => {
    return {
      type: "integer",
      title: props.title,
      description: props.description,
      minimum: props.rules.minimum,
      maximum: props.rules.maximum,
    };
  },
  boolean: (props: BooleanFieldProps): JsonProperty.Boolean => {
    return {
      type: "boolean",
      title: props.title,
      description: props.description,
    };
  },
  date: (props: DateFieldProps): JsonProperty.Date => {
    return {
      type: "string",
      format: "date",
      title: props.title,
      description: props.description,
    };
  },
  enum: (props: EnumFieldProps): JsonProperty.Enum => {
    return {
      type: "string",
      enum: props.options,
      title: props.title,
      description: props.description,
    };
  },
};

function createPropertiesFromFields(fields: FieldProps[]) {
  return fields.reduce(
    (prev, next) => {
      const type = next.type;
      const fieldName = words.toSnakeCase(next.title);

      if (!type) {
        throw new Error("Field type is not defined");
      }

      if (typeGuards.isFieldTypeEmail(type)) {
        return {
          ...prev,
          [fieldName]: jsonSchemaFieldFactory.email(next as EmailFieldProps),
        };
      }

      if (typeGuards.isFieldTypeNumber(type)) {
        return {
          ...prev,
          [fieldName]: jsonSchemaFieldFactory.number(next as NumberFieldProps),
        };
      }

      if (typeGuards.isFieldTypeText(type)) {
        return {
          ...prev,
          [fieldName]: jsonSchemaFieldFactory.text(next as TextFieldProps),
        };
      }

      if (typeGuards.isFieldTypeBoolean(type)) {
        return {
          ...prev,
          [fieldName]: jsonSchemaFieldFactory.boolean(
            next as BooleanFieldProps
          ),
        };
      }

      if (typeGuards.isFieldTypeDate(type)) {
        return {
          ...prev,
          [fieldName]: jsonSchemaFieldFactory.date(next as DateFieldProps),
        };
      }

      if (typeGuards.isFieldTypeEnum(type)) {
        return {
          ...prev,
          [fieldName]: jsonSchemaFieldFactory.enum(next as EnumFieldProps),
        };
      }

      return prev;
    },
    {} as Record<string, any>
  );
}

function createRequiredFromFields(fields: FieldProps[]) {
  const required = new Set();

  fields.forEach((field) => {
    if (field.required) {
      required.add(words.toSnakeCase(field.title));
    }
  });

  return Array.from(required);
}

export function buildJsonSchemaFromFields(
  fields: FieldProps[]
): Record<string, any> {
  const properties = createPropertiesFromFields(fields);
  const required = createRequiredFromFields(fields);

  const schemaContent = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties,
    required,
  };

  return schemaContent;
}
