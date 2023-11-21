"use client";
import React from "react";
import { EditableField } from "./editable-field";
import { FieldTypeSelect } from "./add-field-sidebar";
import { Label } from "../../../@/components/ui/label";
import { Checkbox } from "../../../@/components/ui/checkbox";
import { Separator } from "../../../@/components/ui/separator";
import { FieldProps, FieldType } from "../fields-schema";

const FieldRequiredCheckbox = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  return (
    <Label className="flex gap-2 flex-row">
      Is this field required?
      <Checkbox
        checked={field.required}
        onCheckedChange={(checked) =>
          updateField({ ...field, required: Boolean(checked.valueOf) })
        }
        name="required"
      />
    </Label>
  );
};

export const FieldForm = ({
  field,
  updateField,
  changeType,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
  changeType: (type: FieldType) => void;
}) => {
  return (
    <form className="flex flex-col gap-4 items-start pt-4">
      <FieldTypeSelect type={field.type} onTypeChange={changeType} />
      {field.type && (
        <>
          <Separator orientation="horizontal" />
          <EditableField field={field} updateField={updateField} />
          <FieldRequiredCheckbox field={field} updateField={updateField} />
        </>
      )}
    </form>
  );
};
