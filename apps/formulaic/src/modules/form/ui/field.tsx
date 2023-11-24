"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { BadgeListItem } from "../../../ui/badge-list";
import { BadgeListForm } from "../../../ui/badge-list-form";
import {
  EmailFieldProps,
  EnumFieldProps,
  FieldProps,
  NumberFieldProps,
  TextFieldProps,
  typeGuards,
} from "../fields-schema";
import { CommonFieldsWrapper } from "./field-common";
import { FieldPrimitive } from "./field-primitive";

const NumberField = ({
  field,
  updateField,
}: {
  field: NumberFieldProps;
  updateField: (field: NumberFieldProps) => void;
}) => {
  return (
    <CommonFieldsWrapper
      field={field}
      updateField={updateField}
      titlePlaceholder="How many pizzas do you want?"
      descriptionPlaceholder="How many pizzas should we bake? Don't be shy!"
    >
      <FieldPrimitive.Label label="Minimum value">
        <Input
          value={field.rules?.minimum ?? 0}
          onChange={(e) =>
            updateField({
              ...field,
              rules: { ...field.rules, minimum: Number(e.target.value) },
            })
          }
          type="number"
          name="minimum"
          placeholder="0"
        />
      </FieldPrimitive.Label>
      <FieldPrimitive.Label label="Maximum value">
        <Input
          value={field.rules?.maximum ?? 100}
          onChange={(e) =>
            updateField({
              ...field,
              rules: { ...field.rules, maximum: Number(e.target.value) },
            })
          }
          type="number"
          name="maximum"
          placeholder="100"
        />
      </FieldPrimitive.Label>
    </CommonFieldsWrapper>
  );
};

const TextField = ({
  field,
  updateField,
}: {
  field: TextFieldProps;
  updateField: (field: TextFieldProps) => void;
}) => {
  return (
    <CommonFieldsWrapper
      field={field}
      updateField={updateField}
      titlePlaceholder="Guest name"
      descriptionPlaceholder="Who's joining the pizza party? Enter names here!"
    />
  );
};

const EmailField = ({
  field,
  updateField,
}: {
  field: EmailFieldProps;
  updateField: (field: EmailFieldProps) => void;
}) => {
  return (
    <CommonFieldsWrapper
      field={field}
      updateField={updateField}
      titlePlaceholder="Guest email"
      descriptionPlaceholder="Where should we send your invitation?"
    />
  );
};

const BooleanField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  return (
    <CommonFieldsWrapper
      field={field}
      updateField={updateField}
      titlePlaceholder="Veggie pizza?"
      descriptionPlaceholder="You won't be ostracized! We love all pizza!"
    />
  );
};

const DateField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  return (
    <CommonFieldsWrapper
      field={field}
      updateField={updateField}
      titlePlaceholder="Pizza party date"
      descriptionPlaceholder="When's the pizza fiesta?"
    />
  );
};

const EnumField = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  const [inputValue, setInputValue] = React.useState("");

  if (!typeGuards.isFieldTypeEnum(field.type)) {
    throw new Error("Invalid field type");
  }

  const enumField = field as EnumFieldProps;
  const options = enumField.options ?? [];

  return (
    <CommonFieldsWrapper
      field={field}
      updateField={updateField}
      titlePlaceholder="What pizza flavors do you want?"
      descriptionPlaceholder="Select from a list of our delicious toppings!"
    >
      <FieldPrimitive.Label label="Options">
        <BadgeListForm
          inputPlaceholder="Pepperoni"
          inputValue={inputValue}
          setInputValue={(value) => setInputValue(value)}
          addBadge={() => {
            updateField({
              ...enumField,
              options: [...options, inputValue],
            });
            setInputValue("");
          }}
        >
          {options.map((option) => (
            <BadgeListItem
              key={option}
              onDeleteClick={() =>
                updateField({
                  ...enumField,
                  options: options.filter((o) => o !== option),
                })
              }
            >
              {option}
            </BadgeListItem>
          ))}
        </BadgeListForm>
      </FieldPrimitive.Label>
    </CommonFieldsWrapper>
  );
};

export const Field = ({
  field,
  updateField,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
}) => {
  switch (field.type) {
    case "text":
      return <TextField field={field} updateField={updateField} />;
    case "email":
      return <EmailField field={field} updateField={updateField} />;
    case "number":
      return <NumberField field={field} updateField={updateField} />;
    case "boolean":
      return <BooleanField field={field} updateField={updateField} />;
    case "date":
      return <DateField field={field} updateField={updateField} />;
    case "enum":
      return <EnumField field={field} updateField={updateField} />;
    default:
      const _exhaustiveCheck: never = field;
  }
};
