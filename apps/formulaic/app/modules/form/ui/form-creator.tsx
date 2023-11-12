"use client";

import { Input } from "../../../../@/components/ui/input";
import { Label } from "../../../../@/components/ui/label";
import { Textarea } from "../../../../@/components/ui/textarea";
import { createForm } from "../form-actions";
import { SubmitButton } from "./submit-button";

export const FormCreator = () => {
  return (
    <section>
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
            <Label>
              Name
              <Input
                type="text"
                name="name"
                placeholder="e.g. Invitation form"
              />
            </Label>
            <Label>
              JSON Schema
              <Textarea placeholder={`{ ... }`} name="schemaContent" />
            </Label>
            <Label>
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
    </section>
  );
};
