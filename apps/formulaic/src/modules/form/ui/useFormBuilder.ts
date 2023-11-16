"use client";
import { atom, useAtom } from "jotai";
import { FieldProps } from "../field-factory";

const defaultField: FieldProps = {
  name: "",
  type: undefined,
};

const fieldsAtom = atom<FieldProps[]>([defaultField]);

export function useFormBuilder() {
  const [fields, setFields] = useAtom(fieldsAtom);

  function addField() {
    setFields([...fields, defaultField]);
  }

  function updateField(field: FieldProps) {
    setFields(
      fields.map((f) => {
        if (f.name === field.name) {
          return field;
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
    addField,
    updateField,
    removeField,
  };
}
