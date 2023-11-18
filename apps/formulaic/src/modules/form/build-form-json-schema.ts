import { RJSFSchema } from "@rjsf/utils";

type MakeFieldProps<TType extends string, TRules extends object> = {
  id: string;
  // The `TType` type parameter is used to identify the field in the UI. It's stripped out in the JSON schema.
  type: TType | undefined;
  name: string;
  rules?: TRules;
};

export type TextFieldProps = MakeFieldProps<
  "text",
  {
    minLength?: number;
    maxLength?: number;
  }
>;

export type EmailFieldProps = MakeFieldProps<"email", {}>;

export type NumberFieldProps = MakeFieldProps<
  "number",
  {
    minimum?: number;
    maximum?: number;
  }
>;

export type FieldProps = TextFieldProps | EmailFieldProps | NumberFieldProps;

export type FieldType = NonNullable<FieldProps["type"]>;

const jsonSchemaFieldFactory = {
  text: (props: TextFieldProps): RJSFSchema => {
    const name = props.name.toLocaleLowerCase();
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
    const name = props.name.toLocaleLowerCase();

    return {
      type: "string",
      format: "email",
    };
  },
  number: (props: NumberFieldProps): RJSFSchema => {
    const name = props.name.toLocaleLowerCase();

    return {
      type: "number",
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

export function buildFormJsonSchema(fields: FieldProps[]): Record<string, any> {
  const properties = fields.reduce(
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

  const schemaContent = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties,
  };

  return schemaContent;
}
