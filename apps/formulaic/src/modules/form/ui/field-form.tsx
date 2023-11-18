"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  EmailFieldProps,
  FieldProps,
  NumberFieldProps,
  TextFieldProps,
} from "../field-factory";

const FieldFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-6">{children}</fieldset>;
};

const NumberFieldForm = ({
  field,
  updateField,
}: {
  field: NumberFieldProps;
  updateField: (field: NumberFieldProps) => void;
}) => {
  return (
    <FieldFormWrapper>
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="e.g. Event name"
        />
      </Label>
      <Label>
        Minimum length
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
        Maximum length
        <Input
          value={field.rules?.maximum ?? 0}
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
    </FieldFormWrapper>
  );
};

const TextFieldForm = ({
  field,
  updateField,
}: {
  field: TextFieldProps;
  updateField: (field: TextFieldProps) => void;
}) => {
  return (
    <FieldFormWrapper>
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="e.g. Event name"
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
          value={field.rules?.maxLength ?? 0}
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
    </FieldFormWrapper>
  );
};

const EmailFieldForm = ({
  field,
  updateField,
}: {
  field: EmailFieldProps;
  updateField: (field: EmailFieldProps) => void;
}) => {
  return (
    <FieldFormWrapper>
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField({ ...field, name: e.target.value })}
          type="text"
          name="name"
          placeholder="e.g. Participant e-mail"
        />
      </Label>
    </FieldFormWrapper>
  );
};

export const FieldForm = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  switch (field.type) {
    case "text":
      return <TextFieldForm field={field} updateField={updateField} />;
    case "email":
      return <EmailFieldForm field={field} updateField={updateField} />;
    case "number":
      return <NumberFieldForm field={field} updateField={updateField} />;
  }
};
