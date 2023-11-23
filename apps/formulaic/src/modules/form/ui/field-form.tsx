"use client";
import React from "react";
import { Field } from "./field";
import { FieldTypeSelect } from "./field-type-select";
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
    <form className="pt-4">
      <div className="flex flex-col gap-4 items-start w-4/5">
        <FieldTypeSelect type={field.type} onTypeChange={changeType} />
      </div>
      {field.type && (
        <>
          <Separator className="my-4" orientation="horizontal" />
          <div className="flex flex-col gap-4 items-start w-4/5">
            <Field field={field} updateField={updateField} />
            <FieldRequiredCheckbox field={field} updateField={updateField} />
          </div>
        </>
      )}
    </form>
  );
};
