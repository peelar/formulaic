"use client";

import { Separator } from "@radix-ui/react-separator";
import { Section } from "../../../ui/section";
import { FormActionsResponse } from "../form-actions";
import { ShareButton } from "./share-button";

type Form = FormActionsResponse.GetForm;

export const FormHeader = ({ form }: { form: Form }) => {
  return (
    <Section>
      <header className="flex justify-between items-center">
        <h2 className="text-stone-800 first-letter:uppercase border-0">
          {form.name}
        </h2>
        <ShareButton form={form} />
      </header>
      <Separator className="my-4" orientation="horizontal" />
    </Section>
  );
};
