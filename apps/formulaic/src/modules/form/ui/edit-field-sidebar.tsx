"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet";
import {
  FieldProps,
  FieldType,
  typeGuards,
} from "../json-schema-field-factory";
import { Draggable } from "./draggable";
import { EditableField } from "./editable-field";
import { FieldForm } from "./field-form";
import { useFormBuilder } from "./hooks/useFormBuilder";

export const EditFieldSidebar = ({
  field,
  index,
}: {
  field: FieldProps;
  index: number;
}) => {
  const { updateField, moveField } = useFormBuilder();

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
            <span className="hover:underline">{field.name}</span>
          </SheetTrigger>
        </Draggable>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editing {field.type} field</SheetTitle>
          <FieldForm
            field={field}
            updateField={updateField}
            changeType={changeType}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
