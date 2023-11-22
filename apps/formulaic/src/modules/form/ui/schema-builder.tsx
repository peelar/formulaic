"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Label } from "../../../@/components/ui/label";
import { AddFieldSidebar } from "./add-field-sidebar";
import { EditFieldSidebar } from "./edit-field-sidebar";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { FieldProps } from "../fields-schema";

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
      Fields
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
