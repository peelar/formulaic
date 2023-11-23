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

const descriptionRecord: Record<FieldType, string> = {
  text: "Use it for short, freeform text input, like names or titles.",
  number: "Ideal for numeric values, such as quantities or ratings.",
  email: "Just a good ol' email",
  boolean: "A binary field for true/false options, often as a checkbox.",
  date: "Used for selecting dates, perfect for scheduling.",

  enum: "Allows choosing one option from a predefined list.",
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
      {type && (
        <span className="text-xs text-stone-400 mt-1">
          {descriptionRecord[type]}
        </span>
      )}
    </Label>
  );
};
