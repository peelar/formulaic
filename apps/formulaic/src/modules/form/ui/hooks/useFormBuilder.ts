"use client";
import React, { useContext } from "react";
import { FieldProps } from "../../field-factory";

type SchemaContextType = [
  FieldProps[],
  React.Dispatch<React.SetStateAction<FieldProps[]>>,
];

export const SchemaContext = React.createContext<SchemaContextType>([
  [],
  () => {},
]);

export function useFormBuilder() {
  const [fields, setFields] = useContext(SchemaContext);

  const moveField = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedField = fields[dragIndex];
      const updatedFields = fields.filter((_, index) => index !== dragIndex);
      updatedFields.splice(hoverIndex, 0, draggedField);
      setFields(updatedFields);
    },
    [fields, setFields]
  );

  function updateField(id: string, field: Partial<Omit<FieldProps, "id">>) {
    setFields((prevFields) =>
      prevFields.map((f) => {
        if (f.id === id) {
          return { ...f, ...field };
        }
        return f;
      })
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
  };
}
