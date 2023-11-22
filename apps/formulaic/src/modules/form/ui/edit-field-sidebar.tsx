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
import { FieldForm } from "./field-form";
import { useFormBuilder } from "./hooks/useFormBuilder";

// const fieldTypeIconMap: Record<
//   FieldType,
//   ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
// > = {
//   email: EnvelopeClosedIcon,
//   text: Pencil1Icon,
//   number: PlusIcon,
// };

// const FieldIcon = ({ type }: { type: FieldType }) => {
//   const Icon = fieldTypeIconMap[type];

//   return <Icon />;
// };

const FieldPill = ({ field }: { field: FieldProps }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-start gap-[2px] flex-col hover:underline">
        <span>{field.name}</span>
        {field.required && (
          <span className="text-stone-500 text-[0.6rem]">Required</span>
        )}
      </div>
    </div>
  );
};

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
