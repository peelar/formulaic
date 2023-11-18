"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  EmailFieldProps,
  FieldProps,
  NumberFieldProps,
  TextFieldProps,
} from "../build-form-json-schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../@/components/ui/collapsible";
import { Button } from "../../../@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

const EditableFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-6">{children}</fieldset>;
};

const RulesCollapsible = ({ children }: { children: React.ReactNode }) => {
  return (
    <Collapsible>
      <div className="flex gap-2 items-center">
        <span className="text-sm font-semibold my-4">Custom rules</span>
        <CollapsibleTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <CaretSortIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-2">
          <EditableFieldWrapper>{children}</EditableFieldWrapper>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const NumberEditableField = ({
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
          placeholder="e.g. Event name"
        />
      </Label>
      <RulesCollapsible>
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
      </RulesCollapsible>
    </EditableFieldWrapper>
  );
};

const TextEditableField = ({
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
          placeholder="e.g. Event name"
        />
      </Label>
      <RulesCollapsible>
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
      </RulesCollapsible>
    </EditableFieldWrapper>
  );
};

const EmailEditableField = ({
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
          placeholder="e.g. Participant e-mail"
        />
      </Label>
    </EditableFieldWrapper>
  );
};

export const EditableField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  switch (field.type) {
    case "text":
      return <TextEditableField field={field} updateField={updateField} />;
    case "email":
      return <EmailEditableField field={field} updateField={updateField} />;
    case "number":
      return <NumberEditableField field={field} updateField={updateField} />;
  }
};
