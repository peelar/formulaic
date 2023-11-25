"use client";

import React from "react";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { cn } from "../../../@/lib/utils";
import { Count as UrlCount } from "../../../ui/count";
import { Tooltip } from "../../../ui/tooltip";
import { FormInput } from "../form-input.schema";
import { AllowedUrlsDialog } from "./allowed-urls-dialog";
import { FormThemeSelect } from "./form-theme-select";
import { SchemaBuilder } from "./schema-builder";
import { UseAllowedUrlsValues } from "./hooks/useAllowedUrls";

export const FormCreator = ({
  handleSubmit,
  defaultValues,
  submitButton,
  allowedUrls,
}: {
  handleSubmit: (form: FormData) => Promise<void>;
  defaultValues?: FormInput.Schema;
  submitButton: React.ReactNode;
  allowedUrls: UseAllowedUrlsValues;
}) => {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    handleSubmit(form);
  }

  const count = allowedUrls.urls.length;

  return (
    <div className="my-6">
      <form onSubmit={onSubmit}>
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
        <div className="mt-4">{submitButton}</div>
      </form>
    </div>
  );
};
