"use client";
import { atom, useAtom } from "jotai";
import React from "react";
import { FieldProps } from "../../fields-schema";

export const fieldsAtom = atom<FieldProps[]>([]);

const isDirtyAtom = atom(false);

export function useFormBuilder() {
  const [fields, setFields] = useAtom(fieldsAtom);
  const [isDirty, setIsDirty] = useAtom(isDirtyAtom);

  const moveField = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedField = fields[dragIndex];
      const updatedFields = fields.filter((_, index) => index !== dragIndex);
      updatedFields.splice(hoverIndex, 0, draggedField);
      setIsDirty(true);
      setFields(updatedFields);
    },
    [fields, setFields]
  );

  function addField(field: FieldProps) {
    setIsDirty(true);
    setFields((prevFields) => [...prevFields, field]);
  }

  function updateField(field: FieldProps) {
    setFields((prevFields) =>
      prevFields.map((f) => (f.id === field.id ? field : f))
    );
    setIsDirty(true);
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
    isDirty,
  };
}
