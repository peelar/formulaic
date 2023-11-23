"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import {
  NumberFieldProps,
  TextFieldProps,
  EmailFieldProps,
  FieldProps,
  typeGuards,
  EnumFieldProps,
  FieldType,
} from "../fields-schema";
import { BadgeListForm } from "../../../ui/badge-list-form";
import { BadgeListItem } from "../../../ui/badge-list";
import { FieldPrimitive } from "./field-primitive";

const NumberField = ({
  field,
  updateField,
}: {
  field: NumberFieldProps;
  updateField: (field: NumberFieldProps) => void;
}) => {
  return (
    <FieldPrimitive.FieldWrapper>
      <FieldPrimitive.LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="How many friends are you bringing?"
      />
      <FieldPrimitive.Label label="Minimum value">
        <Input
          value={field.rules?.minimum ?? 0}
          onChange={(e) =>
            updateField({
              ...field,
              rules: { ...field.rules, minimum: Number(e.target.value) },
            })
          }
          type="number"
          name="minimum"
          placeholder="0"
        />
      </FieldPrimitive.Label>
      <FieldPrimitive.Label label="Maximum value">
        <Input
          value={field.rules?.maximum ?? 100}
          onChange={(e) =>
            updateField({
              ...field,
              rules: { ...field.rules, maximum: Number(e.target.value) },
            })
          }
          type="number"
          name="maximum"
          placeholder="100"
        />
      </FieldPrimitive.Label>
    </FieldPrimitive.FieldWrapper>
  );
};

const TextField = ({
  field,
  updateField,
}: {
  field: TextFieldProps;
  updateField: (field: TextFieldProps) => void;
}) => {
  return (
    <FieldPrimitive.FieldWrapper>
      <FieldPrimitive.LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Event name"
      />
      <FieldPrimitive.Label label="Minimum length">
        <Input
          value={field.rules?.minLength ?? 0}
          onChange={(e) =>
            updateField({
              ...field,
              rules: { ...field.rules, minLength: Number(e.target.value) },
            })
          }
          type="number"
          name="minLength"
          placeholder="0"
        />
      </FieldPrimitive.Label>
      <FieldPrimitive.Label label="Maximum length">
        <Input
          value={field.rules?.maxLength ?? 100}
          onChange={(e) =>
            updateField({
              ...field,
              rules: { ...field.rules, maxLength: Number(e.target.value) },
            })
          }
          type="number"
          name="maxLength"
          placeholder="0"
        />
      </FieldPrimitive.Label>
    </FieldPrimitive.FieldWrapper>
  );
};

const EmailField = ({
  field,
  updateField,
}: {
  field: EmailFieldProps;
  updateField: (field: EmailFieldProps) => void;
}) => {
  return (
    <FieldPrimitive.FieldWrapper>
      <FieldPrimitive.LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Guest email"
      />
    </FieldPrimitive.FieldWrapper>
  );
};

const BooleanField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  return (
    <FieldPrimitive.FieldWrapper>
      <FieldPrimitive.LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Are you gonna have fun?"
      />
    </FieldPrimitive.FieldWrapper>
  );
};

const DateField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  return (
    <FieldPrimitive.FieldWrapper>
      <FieldPrimitive.LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Event date"
      />
    </FieldPrimitive.FieldWrapper>
  );
};

const EnumField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  const [inputValue, setInputValue] = React.useState("");

  if (!typeGuards.isFieldTypeEnum(field.type)) {
    throw new Error("Invalid field type");
  }

  const enumField = field as EnumFieldProps;
  const options = enumField.options ?? [];

  return (
    <FieldPrimitive.FieldWrapper>
      <FieldPrimitive.LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="What pizza do you want?"
      />
      <FieldPrimitive.Label
        label="Options"
        helperText="Add options users can choose from"
      >
        <BadgeListForm
          inputPlaceholder="Pepperoni"
          inputValue={inputValue}
          setInputValue={(value) => setInputValue(value)}
          addBadge={() => {
            updateField({
              ...enumField,
              options: [...options, inputValue],
            });
            setInputValue("");
          }}
        >
          {options.map((option) => (
            <BadgeListItem
              key={option}
              onDeleteClick={() =>
                updateField({
                  ...enumField,
                  options: options.filter((o) => o !== option),
                })
              }
            >
              {option}
            </BadgeListItem>
          ))}
        </BadgeListForm>
      </FieldPrimitive.Label>
    </FieldPrimitive.FieldWrapper>
  );
};

export const Field = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  switch (field.type) {
    case "text":
      return <TextField field={field} updateField={updateField} />;
    case "email":
      return <EmailField field={field} updateField={updateField} />;
    case "number":
      return <NumberField field={field} updateField={updateField} />;
    case "boolean":
      return <BooleanField field={field} updateField={updateField} />;
    case "date":
      return <DateField field={field} updateField={updateField} />;
    case "enum":
      return <EnumField field={field} updateField={updateField} />;
    default:
      const _exhaustiveCheck: never = field;
  }
};
