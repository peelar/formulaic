"use client";
import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet";
import { FieldProps, FieldType } from "../field-factory";
import { FieldForm } from "./field-form";
import { Label } from "../../../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Button } from "../../../@/components/ui/button";
import { useFormBuilder } from "./hooks/useFormBuilder";

const options: { id: FieldType; name: string }[] = [
  { id: "text", name: "Text" },
  { id: "email", name: "Email" },
  { id: "number", name: "Number" },
];

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const FieldTypeSelect = ({
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

const isFieldTypeText = (type: FieldType): type is "text" => {
  return type === "text";
};

const isFieldTypeEmail = (type: FieldType): type is "email" => {
  return type === "email";
};

const isFieldTypeNumber = (type: FieldType): type is "number" => {
  return type === "number";
};

export const AddFieldSidebar = () => {
  const { addField } = useFormBuilder();
  const [newField, setNewField] = React.useState<FieldProps>({
    id: generateId(),
    name: "",
    type: undefined,
  });

  function updateField(field: FieldProps) {
    setNewField(field);
  }

  function changeType(type: FieldType) {
    if (isFieldTypeText(type)) {
      setNewField({
        ...newField,
        type,
        rules: {
          minLength: 0,
          maxLength: 0,
        },
      });
    }

    if (isFieldTypeNumber(type)) {
      setNewField({
        ...newField,
        type,
        rules: { minimum: 0, maximum: 0 },
      });
    }

    if (isFieldTypeEmail(type)) {
      setNewField({
        ...newField,
        type,
        rules: { minimum: 0, maximum: 0 },
      });
    }
  }

  function handleFormSubmit() {
    addField(newField);
    setNewField({
      id: generateId(),
      name: "",
      type: undefined,
    });
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Creating new field</SheetTitle>
      </SheetHeader>
      <SheetDescription>
        <form className="flex flex-col gap-4 items-start">
          <FieldTypeSelect type={newField.type} onTypeChange={changeType} />
          <FieldForm field={newField} updateField={updateField} />
        </form>
      </SheetDescription>
      <SheetFooter>
        <SheetTrigger>
          <Button onClick={handleFormSubmit} type="button">
            Create
          </Button>
        </SheetTrigger>
      </SheetFooter>
    </SheetContent>
  );
};
