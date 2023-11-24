"use client";
import { Separator } from "../../../@/components/ui/separator";
import { FieldProps, FieldType } from "../fields-schema";

const fieldTypeLabelMap: Record<FieldType, string> = {
  email: "email",
  text: "text",
  number: "num",
  boolean: "bool",
  date: "date",
  enum: "select",
};

export const FieldPill = ({ field }: { field: FieldProps }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-start gap-[2px] flex-col hover:underline">
        <span>
          {field.title}
          {field.required && "*"}
        </span>{" "}
        <span className="text-stone-400 text-xs">
          {fieldTypeLabelMap[field.type]}
        </span>
      </div>
    </div>
  );
};
