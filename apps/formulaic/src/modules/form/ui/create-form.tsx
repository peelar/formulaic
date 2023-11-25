"use client";

import React from "react";
import { useToast } from "../../../@/components/ui/use-toast";
import { buildJsonSchemaFromFields } from "../fields-to-json-schema";
import { createForm } from "../form-actions";
import { FormInput, formThemeSchema } from "../form-input.schema";
import { FormCreator } from "./form-creator";
import { useAllowedUrls } from "./hooks/useAllowedUrls";
import { useFormBuilder } from "./hooks/useFormBuilder";

export const CreateForm = () => {
  const [isPending, setIsPending] = React.useState(false);
  const allowedUrls = useAllowedUrls();
  const { fields } = useFormBuilder();
  const { toast } = useToast();

  async function onHandleSubmit(form: FormData) {
    setIsPending(true);

    const rawTheme = form.get("theme");
    const theme = formThemeSchema.parse(rawTheme);

    const input: FormInput.Schema = {
      name: form.get("name") as string,
      urls: allowedUrls.urls,
      schemaContent: buildJsonSchemaFromFields(fields),
      theme,
    };

    await createForm(input);
    setIsPending(false);
    toast({
      description: "Your form has been created",
    });
  }
  return (
    <FormCreator
      buttonText="Create"
      handleSubmit={onHandleSubmit}
      isPending={isPending}
      allowedUrls={allowedUrls}
    />
  );
};
