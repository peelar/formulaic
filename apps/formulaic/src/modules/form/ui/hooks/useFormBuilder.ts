"use client";
import { atom, useAtom } from "jotai";
import React from "react";
import { FieldProps } from "../../fields-schema";

export const fieldsAtom = atom<FieldProps[]>([]);

export function useFormBuilder() {
  const [fields, setFields] = useAtom(fieldsAtom);

  const moveField = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedField = fields[dragIndex];
      const updatedFields = fields.filter((_, index) => index !== dragIndex);
      updatedFields.splice(hoverIndex, 0, draggedField);
      setFields(updatedFields);
    },
    [fields, setFields]
  );

  function addField(field: FieldProps) {
    setFields((prevFields) => [...prevFields, field]);
  }

  function updateField(field: FieldProps) {
    setFields((prevFields) =>
      prevFields.map((f) => (f.id === field.id ? field : f))
    );
  }

  function removeField(field: FieldProps) {
    setFields(fields.filter((f) => f !== field));
  }

  return {
    fields,
    updateField,
    removeField,
    moveField,
    addField,
  };
}
