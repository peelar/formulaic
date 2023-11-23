import { RJSFSchema } from "@rjsf/utils";
import {
  EnumFieldProps,
  FieldProps,
  NumberFieldProps,
  TextFieldProps,
  typeGuards,
} from "./fields-schema";

const jsonSchemaFieldFactory = {
  text: (props: TextFieldProps): RJSFSchema => {
    return {
      type: "string",
      ...(props.rules && {
        ...(props.rules.minLength && {
          minLength: props.rules.minLength,
        }),
      }),
    };
  },
  email: (): RJSFSchema => {
    return {
      type: "string",
      format: "email",
    };
  },
  number: (props: NumberFieldProps): RJSFSchema => {
    return {
      type: "integer",
      ...(props.rules && {
        ...(props.rules.minimum && {
          minimum: props.rules.minimum,
        }),
        ...(props.rules.maximum && {
          maximum: props.rules.maximum,
        }),
      }),
    };
  },
  boolean: (): RJSFSchema => {
    return {
      type: "boolean",
    };
  },
  date: (): RJSFSchema => {
    return { type: "string", format: "date" };
  },
  enum: (props: EnumFieldProps): RJSFSchema => {
    return {
      type: "string",
      enum: props.options,
    };
  },
};

function createPropertiesFromFields(fields: FieldProps[]) {
  return fields.reduce(
    (prev, next) => {
      const type = next.type;

      if (!type) {
        throw new Error("Field type is not defined");
      }

      if (typeGuards.isFieldTypeEmail(type)) {
        return {
          ...prev,
          [next.name]: jsonSchemaFieldFactory.email(),
        };
      }

      if (typeGuards.isFieldTypeNumber(type)) {
        return {
          ...prev,
          [next.name]: jsonSchemaFieldFactory.number(next as NumberFieldProps),
        };
      }

      if (typeGuards.isFieldTypeText(type)) {
        return {
          ...prev,
          [next.name]: jsonSchemaFieldFactory.text(next as TextFieldProps),
        };
      }

      if (typeGuards.isFieldTypeBoolean(type)) {
        return {
          ...prev,
          [next.name]: jsonSchemaFieldFactory.boolean(),
        };
      }

      if (typeGuards.isFieldTypeDate(type)) {
        return {
          ...prev,
          [next.name]: jsonSchemaFieldFactory.date(),
        };
      }

      if (typeGuards.isFieldTypeEnum(type)) {
        return {
          ...prev,
          [next.name]: jsonSchemaFieldFactory.enum(next as EnumFieldProps),
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
      required.add(field.name);
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
