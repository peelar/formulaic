import { RJSFSchema } from "@rjsf/utils";
import {
  TextFieldProps,
  EmailFieldProps,
  NumberFieldProps,
  FieldType,
  FieldProps,
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
  email: (props: EmailFieldProps): RJSFSchema => {
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
          [next.name]: jsonSchemaFieldFactory.email(next as EmailFieldProps),
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

export function buildFormJsonSchemaFromFields(
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
