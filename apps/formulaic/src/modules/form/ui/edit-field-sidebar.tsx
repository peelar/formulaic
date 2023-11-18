"use client";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../@/components/ui/sheet";
import { FieldProps } from "../json-schema-field-factory";
import { FieldForm } from "./field-form";
import { useFormBuilder } from "./hooks/useFormBuilder";

export const EditFieldSidebar = ({ field }: { field: FieldProps }) => {
  const { updateField } = useFormBuilder();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editing {field.type} field</SheetTitle>
        <div className="pt-4">
          <FieldForm field={field} updateField={updateField} />
        </div>
      </SheetHeader>
    </SheetContent>
  );
};
