"use client";
import { Button } from "../../../@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet";

import { Draggable } from "../../../ui/draggable";
import { FieldProps, FieldType, typeGuards } from "../fields-schema";
import { FieldPill } from "./field-pill";
import { FieldForm } from "./field-form";
import { useFormBuilder } from "./hooks/useFormBuilder";

export const EditFieldSidebar = ({
  field,
  index,
}: {
  field: FieldProps;
  index: number;
}) => {
  const { updateField, moveField, removeField } = useFormBuilder();

  function changeType(type: FieldType) {
    if (typeGuards.isFieldTypeText(type)) {
      updateField({
        ...field,
        type,
        rules: { minLength: 0, maxLength: 0 },
      });
    }

    if (typeGuards.isFieldTypeEmail(type)) {
      updateField({
        ...field,
        type,
      });
    }

    if (typeGuards.isFieldTypeNumber(type)) {
      updateField({
        ...field,
        type,
        rules: { minimum: 0, maximum: 0 },
      });
    }
  }

  return (
    <Sheet key={field.id}>
      <div className="border pr-2 rounded-sm">
        <Draggable id={field.id} index={index} moveFn={moveField}>
          <SheetTrigger>
            <FieldPill field={field} />
          </SheetTrigger>
        </Draggable>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editing {field.type} field</SheetTitle>
        </SheetHeader>
        <FieldForm
          field={field}
          updateField={updateField}
          changeType={changeType}
        />
        <SheetFooter>
          <SheetTrigger asChild>
            <Button
              onClick={() => removeField(field)}
              type="button"
              variant={"destructive"}
            >
              Delete
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
