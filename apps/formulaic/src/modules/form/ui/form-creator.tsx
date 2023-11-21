"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { UrlBadges } from "../../../ui/url-badges";
import { buildFormJsonSchemaFromFields } from "../fields-to-json-schema";
import { FormInput } from "../form-service";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { SchemaBuilder } from "./schema-builder";

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
      schemaContent: buildFormJsonSchemaFromFields(fields),
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
              Domains the form is allowed to be embedded on. This is used to
              make sure the form is not embedded on other websites.
            </span>
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
