"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { createForm } from "../form-actions";
import { FormCreateInput } from "../form-service";
import {
  EmailFieldProps,
  NumberFieldProps,
  TextFieldProps,
  jsonSchemaFieldFactory,
  typeGuards,
} from "../json-schema-field-factory";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { SchemaBuilder } from "./schema-builder";
import { SubmitButton } from "./submit-button";

export const FormCreator = () => {
  const [isPending, setIsPending] = React.useState(false);
  const { fields } = useFormBuilder();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsPending(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    // create input from form

    const schemaContent = fields.reduce(
      (prev, next) => {
        const type = next.type;

        if (!type) {
          throw new Error("Field type is not defined");
        }

        if (typeGuards.isFieldTypeEmail(type)) {
          return {
            ...prev,
            [next.name]: jsonSchemaFieldFactory.email(next as EmailFieldProps),
          };
        }

        if (typeGuards.isFieldTypeNumber(type)) {
          return {
            ...prev,
            [next.name]: jsonSchemaFieldFactory.number(
              next as NumberFieldProps
            ),
          };
        }

        if (typeGuards.isFieldTypeText(type)) {
          return {
            ...prev,
            [next.name]: jsonSchemaFieldFactory.text(next as TextFieldProps),
          };
        }

        return prev;
      },
      {} as Record<string, any>
    );

    const input: Pick<FormCreateInput, "name" | "domain" | "schemaContent"> = {
      name: form.get("name") as string,
      domain: form.get("domain") as string,
      schemaContent,
    };

    await createForm(input);
    setIsPending(false);
  }

  return (
    <div className="mt-24">
      <h3>
        Create your{" "}
        <span className="underline decoration-violet-600 decoration-4">
          Formulaic
        </span>{" "}
        form
      </h3>
      <div className="my-6">
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-6">
            <Label className="md:w-2/5">
              Name
              <Input
                type="text"
                name="name"
                placeholder="e.g. Invitation form"
              />
            </Label>

            <SchemaBuilder />

            <Label className="md:w-2/5">
              Domain
              <Input
                type="text"
                name="domain"
                placeholder="e.g. https://example.com"
              />
              <span className="text-stone-400 text-small">
                Domain that the form will be embedded on. This is used to verify
                the origin of the request.
              </span>
            </Label>
          </fieldset>
          <div className="mt-4">
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </div>
    </div>
  );
};
