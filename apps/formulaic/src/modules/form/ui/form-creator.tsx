"use client";

import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { createForm } from "../form-actions";
import { SubmitButton } from "./submit-button";
import { SchemaBuilder } from "./schema-builder";
import React from "react";
import { FieldProps } from "../field-factory";
import { SchemaContext } from "./hooks/useFormBuilder";

const SchemaProvider = ({ children }) => {
  const fieldsState = React.useState<FieldProps[]>([]);

  return (
    <SchemaContext.Provider value={fieldsState}>
      {children}
    </SchemaContext.Provider>
  );
};

export const FormCreator = () => {
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
        <form action={createForm}>
          <fieldset className="flex flex-col gap-6">
            <Label className="md:w-2/5">
              Name
              <Input
                type="text"
                name="name"
                placeholder="e.g. Invitation form"
              />
            </Label>
            <SchemaProvider>
              <SchemaBuilder />
            </SchemaProvider>
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
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};
