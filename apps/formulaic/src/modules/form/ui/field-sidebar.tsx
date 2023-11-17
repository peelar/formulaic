"use client";
import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../@/components/ui/sheet";
import {
  EmailFieldProps,
  FieldProps,
  FieldType,
  NumberFieldProps,
  TextFieldProps,
} from "../field-factory";
import { useFormBuilder } from "./hooks/useFormBuilder";

const options: { id: FieldType; name: string }[] = [
  { id: "text", name: "Text" },
  { id: "email", name: "Email" },
  { id: "number", name: "Number" },
];

const _FieldTypeSelect = ({ field }: { field: FieldProps }) => {
  return (
    <Label>
      Field type
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select field type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
};

const FieldFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-6">{children}</fieldset>;
};

const TextFieldForm = ({ field }: { field: TextFieldProps }) => {
  const { updateField } = useFormBuilder();

  return (
    <FieldFormWrapper>
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField(field.id, { name: e.target.value })}
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
            updateField(field.id, {
              rules: { ...field.rules, minLength: e.target.value },
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
            updateField(field.id, {
              rules: { ...field.rules, maxLength: e.target.value },
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

const NumberFieldForm = ({ field }: { field: NumberFieldProps }) => {
  const { updateField } = useFormBuilder();

  return (
    <FieldFormWrapper>
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField(field.id, { name: e.target.value })}
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
            updateField(field.id, {
              rules: { ...field.rules, minimum: e.target.value },
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
            updateField(field.id, {
              rules: { ...field.rules, maximum: e.target.value },
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

const EmailFieldForm = ({ field }: { field: EmailFieldProps }) => {
  const { updateField } = useFormBuilder();

  return (
    <FieldFormWrapper>
      <Label>
        Name
        <Input
          value={field.name}
          onChange={(e) => updateField(field.id, { name: e.target.value })}
          type="text"
          name="name"
          placeholder="e.g. Participant e-mail"
        />
      </Label>
    </FieldFormWrapper>
  );
};

const FieldForm = ({ field }: { field: FieldProps }) => {
  switch (field.type) {
    case "text":
      return <TextFieldForm field={field} />;
    case "email":
      return <EmailFieldForm field={field} />;
    case "number":
      return <NumberFieldForm field={field} />;
  }
};

export const FieldSidebar = ({ field }: { field: FieldProps }) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editing {field.type} field</SheetTitle>
        <FieldForm field={field} />
      </SheetHeader>
    </SheetContent>
  );
};
