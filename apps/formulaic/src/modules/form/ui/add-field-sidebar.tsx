"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../../../@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet";

import { useFormBuilder } from "./hooks/useFormBuilder";
import { generateId } from "../../../lib/id";
import { FieldForm } from "./field-form";

import { FieldProps, FieldType, typeGuards } from "../fields-schema";

function generateDefaultField(): FieldProps {
  return {
    id: generateId(),
    type: "text",
    required: false,
    title: "",
    description: "",
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
      });
    }

    if (typeGuards.isFieldTypeBoolean(type)) {
      setNewField({
        ...newField,
        type,
      });
    }

    if (typeGuards.isFieldTypeDate(type)) {
      setNewField({
        ...newField,
        type,
      });
    }

    if (typeGuards.isFieldTypeEnum(type)) {
      setNewField({
        ...newField,
        type,
        options: [],
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
        <FieldForm
          field={newField}
          updateField={updateField}
          changeType={changeType}
        />
        <SheetFooter>
          <SheetTrigger>
            <Button className="mt-8" onClick={handleFormSubmit} type="button">
              Create
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
