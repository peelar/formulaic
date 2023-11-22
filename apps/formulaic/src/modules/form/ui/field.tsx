"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  NumberFieldProps,
  TextFieldProps,
  EmailFieldProps,
  FieldProps,
} from "../fields-schema";

const EditableFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-6">{children}</fieldset>;
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
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Event name"
        />
      </Label>
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
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Event name"
        />
      </Label>
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
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Participant e-mail"
        />
      </Label>
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
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Do you accept the terms?"
        />
      </Label>
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
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Event date"
        />
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
    default:
      const _exhaustiveCheck: never = field;
  }
};
