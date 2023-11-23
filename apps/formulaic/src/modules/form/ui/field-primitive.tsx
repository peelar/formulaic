"use client";
import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label as _Label } from "../../../@/components/ui/label";

const FieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-6">{children}</fieldset>;
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

const LabeledNameInput = ({
  value,
  onChange,
  placeholder,
  helperText,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText?: string;
}) => {
  return (
    <Label label="Name" helperText={helperText}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        name="name"
        placeholder={placeholder}
      />
    </Label>
  );
};

export const FieldPrimitive = {
  FieldWrapper,
  Label,
  LabeledNameInput,
};
