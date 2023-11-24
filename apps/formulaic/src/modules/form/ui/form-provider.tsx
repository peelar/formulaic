"use client";
import { Provider, useSetAtom } from "jotai";
import React from "react";
import { FieldProps } from "../fields-schema";
import { fieldsAtom } from "./hooks/useFormBuilder";

export const FormProvider = ({
  children,
  defaultValues = [],
}: {
  children: React.ReactNode;
  defaultValues?: FieldProps[];
}) => {
  const setFields = useSetAtom(fieldsAtom);

  React.useEffect(() => {
    if (defaultValues) {
      setFields(defaultValues);
    }
  }, [defaultValues, setFields]);

  return <Provider>{children}</Provider>;
};
