"use client";

import React from "react";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { buildFormJsonSchemaFromFields } from "../fields-to-json-schema";
import { FormInput } from "../form-service";
import { AllowedUrlsDialog } from "./allowed-urls-dialog";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { SchemaBuilder } from "./schema-builder";

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
  onHandleSubmit: (input: FormInput) => Promise<void>;
  defaultValues?: FormInput;
  buttonText: string;
}) => {
  const [isPending, setIsPending] = React.useState(false);
  const { fields } = useFormBuilder();

  const allowedUrls = useAllowedUrls({
    defaultValues: defaultValues?.urls,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsPending(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const input: FormInput = {
      name: form.get("name") as string,
      urls: allowedUrls.urls,
      schemaContent: buildFormJsonSchemaFromFields(fields),
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
              placeholder="e.g. Invitation form"
            />
          </Label>
          <SchemaBuilder />
          <Label className="flex flex-col items-start md:w-2/5">
            <span className="flex items-center">
              Allowed URLs
              <span className="bg-secondary text-primary ml-2 w-6 h-6 border rounded-sm flex items-center justify-center">
                {urlCount}
              </span>
            </span>
            <AllowedUrlsDialog {...allowedUrls} />
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
