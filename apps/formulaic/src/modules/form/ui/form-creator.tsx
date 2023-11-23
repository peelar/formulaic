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
import { cn } from "../../../@/lib/utils";
import { Tooltip } from "../../../ui/tooltip";

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

const UrlCount = ({ count }: { count: number }) => {
  const isZero = count === 0;
  return (
    <span
      className={cn(
        "bg-secondary text-primary ml-2 w-6 h-6 border rounded-sm flex items-center justify-center",
        isZero ? "underline" : ""
      )}
    >
      {count}
    </span>
  );
};

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
    setIsPending(false);
  }

  const urlCount = allowedUrls.urls.length;

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
                <UrlCount count={urlCount} />
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
