"use client";

import React from "react";
import { getForm } from "../form-actions";
import { Section } from "../../../ui/section";
import { ShareButton } from "./share-button";
import { Separator } from "@radix-ui/react-separator";

type Form = Awaited<ReturnType<typeof getForm>>;

export const FormHeader = ({ form }: { form: Form }) => {
  return (
    <Section>
      <header className="flex justify-between items-center">
        <h2 className="text-stone-800 capitalize border-0">{form.name}</h2>
        <ShareButton form={form} />
      </header>
      <Separator className="my-4" orientation="horizontal" />
    </Section>
  );
};
