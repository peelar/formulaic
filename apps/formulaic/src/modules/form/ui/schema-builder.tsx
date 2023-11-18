"use client";

import {
  EnvelopeClosedIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../../@/components/ui/button";
import { Label } from "../../../@/components/ui/label";
import { Sheet, SheetTrigger } from "../../../@/components/ui/sheet";
import { FieldProps, FieldType } from "../json-schema-field-factory";
import { AddFieldSidebar } from "./add-field-sidebar";
import { Draggable } from "./draggable";
import { EditFieldSidebar } from "./edit-field-sidebar";
import { useFormBuilder } from "./hooks/useFormBuilder";

const _fieldTypeToIcon: Record<
  FieldType,
  React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
> = {
  email: EnvelopeClosedIcon,
  number: PlusIcon,
  text: Pencil1Icon,
};

export const SchemaBuilder = () => {
  const { fields } = useFormBuilder();

  const renderFieldNames = React.useCallback(
    (field: FieldProps, index: number) => {
      return <EditFieldSidebar field={field} index={index} />;
    },
    [fields]
  );

  return (
    <Label>
      Form fields
      <div className="md:w-2/5">
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col items-start gap-4">
            {!fields.length && (
              <p className="text-stone-400 my-0">
                Add first field to your form
              </p>
            )}
            {fields?.map((field, i) => renderFieldNames(field, i))}
            <AddFieldSidebar />
          </div>
        </DndProvider>
      </div>
    </Label>
  );
};
