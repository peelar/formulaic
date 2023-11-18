"use client";
import React from "react";
import { SchemaContext } from "./hooks/useFormBuilder";
import { FieldProps } from "../json-schema-field-factory";

export const SchemaProvider = ({ children }) => {
  const fieldsState = React.useState<FieldProps[]>([]);

  return (
    <SchemaContext.Provider value={fieldsState}>
      {children}
    </SchemaContext.Provider>
  );
};
