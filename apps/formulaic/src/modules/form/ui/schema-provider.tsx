"use client";
import React from "react";
import { SchemaContext } from "./hooks/useFormBuilder";
import { FieldProps } from "../build-form-json-schema";

export const SchemaProvider = ({
  children,
  defaultValues = [],
}: {
  children: React.ReactNode;
  defaultValues?: FieldProps[];
}) => {
  const fieldsState = React.useState<FieldProps[]>(defaultValues);

  return (
    <SchemaContext.Provider value={fieldsState}>
      {children}
    </SchemaContext.Provider>
  );
};
