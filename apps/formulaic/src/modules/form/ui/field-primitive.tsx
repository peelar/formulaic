"use client";
import React from "react";
import { Label as _Label } from "../../../@/components/ui/label";

const FieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-6 w-full">{children}</div>;
};

const Label = ({
  children,
  label,
  helperText,
}: {
  children: React.ReactNode;
  label: string;
  helperText?: string;
}) => {
  return (
    <_Label>
      {label}
      {children}
      {helperText && (
        <span className="text-stone-500 text-sm">{helperText}</span>
      )}
    </_Label>
  );
};

export const FieldPrimitive = {
  FieldWrapper,
  Label,
};
