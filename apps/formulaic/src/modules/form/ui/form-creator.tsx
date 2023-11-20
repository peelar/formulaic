"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { buildFormJsonSchema } from "../build-form-json-schema";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { SchemaBuilder } from "./schema-builder";
import { SubmitButton } from "./submit-button";
import { FormInput } from "../form-service";

export const FormCreator = ({
  onHandleSubmit,
  defaultValues,
}: {
  onHandleSubmit: (input: FormInput) => Promise<void>;
  defaultValues?: FormInput;
}) => {
  const [isPending, setIsPending] = React.useState(false);
  const { fields } = useFormBuilder();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsPending(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const input: FormInput = {
      name: form.get("name") as string,
      domain: form.get("domain") as string,
      schemaContent: buildFormJsonSchema(fields),
    };

    await onHandleSubmit(input);
    setIsPending(false);
  }

  return (
    <div className="my-6">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-6">
          <Label className="md:w-2/5">
            Name
            <Input
              defaultValue={defaultValues?.name}
              type="text"
              name="name"
              placeholder="e.g. Invitation form"
            />
          </Label>

          <SchemaBuilder />

          <Label className="md:w-2/5">
            Domain
            <Input
              defaultValue={defaultValues?.domain}
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
  );
};
