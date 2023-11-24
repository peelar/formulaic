"use client";

import React from "react";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { buildJsonSchemaFromFields } from "../fields-to-json-schema";
import { FormInput, formThemeSchema } from "../form-input.schema";
import { AllowedUrlsDialog } from "./allowed-urls-dialog";
import { FormThemeSelect } from "./form-theme-select";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { SchemaBuilder } from "./schema-builder";
import { Tooltip } from "../../../ui/tooltip";
import { Count as UrlCount } from "../../../ui/count";
import { cn } from "../../../@/lib/utils";
import { useToast } from "../../../@/components/ui/use-toast";

const useAllowedUrls = ({
  defaultValues = [],
}: {
  defaultValues?: string[];
}) => {
  const [urls, setUrls] = React.useState<string[]>(defaultValues);
  const [urlValue, setUrlValue] = React.useState("");

  const deleteUrl = (url: string) => {
    setUrls(urls.filter((u) => u !== url));
  };

  const addUrl = () => {
    setUrls([...urls, urlValue]);
    setUrlValue("");
  };

  return { urls, deleteUrl, addUrl, urlValue, setUrlValue };
};

export type UseAllowedUrlsValues = ReturnType<typeof useAllowedUrls>;

export const FormCreator = ({
  onHandleSubmit,
  defaultValues,
  buttonText,
}: {
  onHandleSubmit: (input: FormInput.Schema) => Promise<void>;
  defaultValues?: FormInput.Schema;
  buttonText: string;
}) => {
  const [isPending, setIsPending] = React.useState(false);
  const { fields } = useFormBuilder();
  const { toast } = useToast();

  const allowedUrls = useAllowedUrls({
    defaultValues: defaultValues?.urls,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const form = new FormData(e.currentTarget);

    const rawTheme = form.get("theme");
    const theme = formThemeSchema.parse(rawTheme);

    const input: FormInput.Schema = {
      name: form.get("name") as string,
      urls: allowedUrls.urls,
      schemaContent: buildJsonSchemaFromFields(fields),
      theme,
    };

    await onHandleSubmit(input);

    // todo: split up into update and create forms
    // toast({
    //   description: "Your form has been saved",
    // });

    setIsPending(false);
  }

  const count = allowedUrls.urls.length;

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
              placeholder="Invitation form"
              required
            />
          </Label>
          <SchemaBuilder />

          <Label className="flex flex-col items-start md:w-2/5">
            <Tooltip tooltipContent="You must add at least one URL to embed this form.">
              <span className="flex items-center">
                Allowed URLs
                <UrlCount
                  className={cn(
                    "bg-secondary text-primary",
                    count === 0 ? "underline" : ""
                  )}
                  count={count}
                />
              </span>
            </Tooltip>

            <AllowedUrlsDialog {...allowedUrls} />
          </Label>
          <Label>
            Theme
            <FormThemeSelect defaultValue={defaultValues?.theme ?? "MUI"} />
          </Label>
        </fieldset>
        <div className="mt-4">
          <Button disabled={isPending} type="submit">
            {isPending ? "Loading..." : buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};
