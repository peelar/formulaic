"use client";

import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { FieldProps, FieldType } from "../field-factory";
import { useFormBuilder } from "./useFormBuilder";

const options: { id: FieldType; name: string }[] = [
  { id: "text", name: "Text" },
  { id: "email", name: "Email" },
  { id: "number", name: "Number" },
];

const FieldDetailsComponent = ({ field }: { field: FieldProps }) => {
  const fieldType = field.type;

  switch (fieldType) {
    case "text":
      return (
        <>
          <Label>
            Minimum length
            <Input
              value={field.rules?.minLength}
              type="number"
              name="minLength"
              placeholder="0"
            />
          </Label>
          <Label>
            Maximum length
            <Input type="number" name="maxLength" placeholder="100" />
          </Label>
        </>
      );
    case "number":
      return (
        <>
          <Label>
            Minimum
            <Input type="number" name="minimum" placeholder="0" />
          </Label>
          <Label>
            Maximum
            <Input type="number" name="maximum" placeholder="100" />
          </Label>
        </>
      );
  }
};

const EditableFieldComponent = () => {
  return (
    <fieldset className="flex gap-4 items-center mt-4">
      <Label>
        Name
        <Input type="text" name="name" placeholder="e.g. Phone number" />
      </Label>
      <Label>
        Field type
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Label>
      {/* <FieldDetailsComponent  /> */}
    </fieldset>
  );
};

export const SchemaBuilder = () => {
  const { fields } = useFormBuilder();

  return (
    <Label>
      JSON Schema
      {/* // todo: map state of fields */}
      {fields.map((field) => (
        <EditableFieldComponent />
      ))}
    </Label>
  );
};
