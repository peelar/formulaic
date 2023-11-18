"use client";
import React from "react";
import { FieldProps, FieldType } from "../json-schema-field-factory";
import { EditableField } from "./editable-field";
import { FieldTypeSelect } from "./add-field-sidebar";

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
    <form className="flex flex-col gap-4 items-start my-4">
      <FieldTypeSelect type={field.type} onTypeChange={changeType} />
      <EditableField field={field} updateField={updateField} />
    </form>
  );
};
