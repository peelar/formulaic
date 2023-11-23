"use client";
import React from "react";
import { Label } from "../../../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { FieldType } from "../fields-schema";

const optionsRecord: Record<FieldType, string> = {
  text: "Text",
  number: "Number",
  email: "Email",
  boolean: "Checkbox",
  date: "Date",
  enum: "Select",
};

const options: { id: FieldType; name: string }[] = Object.entries(
  optionsRecord
).map(([id, name]) => ({ id: id as FieldType, name }));

export const FieldTypeSelect = ({
  type,
  onTypeChange,
}: {
  type: FieldType | undefined;
  onTypeChange: (type: FieldType) => void;
}) => {
  return (
    <Label>
      Field type
      <Select
        onValueChange={(value) => onTypeChange(value as FieldType)}
        value={type}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select field type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
};
