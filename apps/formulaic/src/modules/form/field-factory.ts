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

export const jsonSchemaFieldFactory = {
  text: (props: TextFieldProps): RJSFSchema => {
    const name = props.name.toLocaleLowerCase();
    return {
      [name]: {
        type: "string",
        ...(props.rules && {
          ...(props.rules.minLength && {
            minLength: props.rules.minLength,
          }),
        }),
      },
    };
  },
  email: (props: EmailFieldProps): RJSFSchema => {
    const name = props.name.toLocaleLowerCase();

    return {
      [name]: {
        type: "string",
        format: "email",
      },
    };
  },
  number: (props: NumberFieldProps): RJSFSchema => {
    const name = props.name.toLocaleLowerCase();

    return {
      [name]: {
        type: "number",
        ...(props.rules && {
          ...(props.rules.minimum && {
            minimum: props.rules.minimum,
          }),
          ...(props.rules.maximum && {
            maximum: props.rules.maximum,
          }),
        }),
      },
    };
  },
};
