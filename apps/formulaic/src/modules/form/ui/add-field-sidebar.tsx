"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../../../@/components/ui/button";
import { Label } from "../../../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet";
import {
  FieldProps,
  FieldType,
  typeGuards,
} from "../json-schema-field-factory";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { generateId } from "../../../lib/id";
import { FieldForm } from "./field-form";

const options: { id: FieldType; name: string }[] = [
  { id: "text", name: "Text" },
  { id: "email", name: "Email" },
  { id: "number", name: "Number" },
];

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

function generateDefaultField() {
  return {
    id: generateId(),
    name: "",
    type: undefined,
  };
}

export const AddFieldSidebar = () => {
  const { addField } = useFormBuilder();
  const [newField, setNewField] = React.useState<FieldProps>(
    generateDefaultField()
  );

  function updateField(field: FieldProps) {
    setNewField(field);
  }

  function changeType(type: FieldType) {
    if (typeGuards.isFieldTypeText(type)) {
      setNewField({
        ...newField,
        type,
        rules: {
          minLength: 0,
          maxLength: 0,
        },
      });
    }

    if (typeGuards.isFieldTypeNumber(type)) {
      setNewField({
        ...newField,
        type,
        rules: { minimum: 0, maximum: 0 },
      });
    }

    if (typeGuards.isFieldTypeEmail(type)) {
      setNewField({
        ...newField,
        type,
        rules: { minimum: 0, maximum: 0 },
      });
    }
  }

  function handleFormSubmit() {
    addField(newField);
    setNewField(generateDefaultField());
  }

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setNewField(generateDefaultField());
        }
      }}
    >
      <SheetTrigger asChild>
        <Button type="button" variant={"secondary"}>
          {" "}
          <PlusIcon className="mr-2" /> Add field
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Creating new field</SheetTitle>
        </SheetHeader>
        <div>
          <FieldForm
            field={newField}
            updateField={updateField}
            changeType={changeType}
          />
        </div>
        <SheetFooter>
          <SheetTrigger>
            <Button onClick={handleFormSubmit} type="button">
              Create
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
