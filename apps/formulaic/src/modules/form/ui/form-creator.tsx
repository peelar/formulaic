"use client";

import React from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { buildFormJsonSchema } from "../build-form-json-schema";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { SchemaBuilder } from "./schema-builder";
import { SubmitButton } from "./submit-button";
import { FormInput } from "../form-service";
import { UrlBadges } from "../../../ui/url-badges";
import { Button } from "../../../@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export const FormCreator = ({
  onHandleSubmit,
  defaultValues,
}: {
  onHandleSubmit: (input: FormInput) => Promise<void>;
  defaultValues?: FormInput;
}) => {
  const [isPending, setIsPending] = React.useState(false);
  const { fields } = useFormBuilder();
  const [urls, setUrls] = React.useState<string[]>(defaultValues?.urls ?? []);
  const [urlValue, setUrlValue] = React.useState("");

  const deleteUrl = (url: string) => {
    setUrls(urls.filter((u) => u !== url));
  };

  const addUrl = () => {
    setUrls([...urls, urlValue]);
    setUrlValue("");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsPending(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const input: FormInput = {
      name: form.get("name") as string,
      urls,
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
            Allowed URLs
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  type="text"
                  name="domain"
                  placeholder="https://example.com"
                  className="w-3/5"
                />
                <Button type="button" size="icon" onClick={addUrl}>
                  <PlusIcon />
                </Button>
              </div>
              <UrlBadges urls={urls} onDeleteClick={deleteUrl} />
            </div>
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
