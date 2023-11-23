"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  NumberFieldProps,
  TextFieldProps,
  EmailFieldProps,
  FieldProps,
  typeGuards,
  EnumFieldProps,
} from "../fields-schema";
import { BadgeListForm } from "../../../ui/badge-list-form";
import { BadgeListItem } from "../../../ui/badge-list";

const EditableFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-6">{children}</fieldset>;
};

const LabeledNameInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <Label>
      Name
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        name="name"
        placeholder={placeholder}
      />
    </Label>
  );
};

const NumberField = ({
  field,
  updateField,
}: {
  field: NumberFieldProps;
  updateField: (field: NumberFieldProps) => void;
}) => {
  return (
    <EditableFieldWrapper>
      <LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Age"
      />
      <Label>
        Minimum value
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
      </Label>
      <Label>
        Maximum value
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
      </Label>
    </EditableFieldWrapper>
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
    <EditableFieldWrapper>
      <LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Event name"
      />
      <Label>
        Minimum length
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
      </Label>
      <Label>
        Maximum length
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
      </Label>
    </EditableFieldWrapper>
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
    <EditableFieldWrapper>
      <LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Participant email"
      />
    </EditableFieldWrapper>
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
    <EditableFieldWrapper>
      <LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Do you accept the terms?"
      />
    </EditableFieldWrapper>
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
    <EditableFieldWrapper>
      <LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="Event date"
      />
    </EditableFieldWrapper>
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
    <EditableFieldWrapper>
      <LabeledNameInput
        value={field.name}
        onChange={(value) => updateField({ ...field, name: value })}
        placeholder="What pizza do you want?"
      />
      <Label>
        Options
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
      </Label>
    </EditableFieldWrapper>
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
