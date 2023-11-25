"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useToast } from "../../../@/components/ui/use-toast";
import { buildJsonSchemaFromFields } from "../fields-to-json-schema";
import { updateFormWithNewSchema } from "../form-actions";
import { FormInput, formThemeSchema } from "../form-input.schema";
import { FormCreator } from "./form-creator";
import { useAllowedUrls } from "./hooks/useAllowedUrls";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { Button } from "../../../@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../@/components/ui/alert-dialog";

const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending}>
          {isPending ? "Loading..." : "Update"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You form will be deleted permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const UpdateForm = ({
  defaultValues,
}: {
  defaultValues: FormInput.Schema;
}) => {
  const params = useParams();
  const id = params.id as string;

  const [isPending, setIsPending] = React.useState(false);
  const allowedUrls = useAllowedUrls(defaultValues?.urls);
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

    await updateFormWithNewSchema(id, input);
    setIsPending(false);
    toast({
      description: "Your form has been updated",
    });
  }
  return (
    <FormCreator
      submitButton={<SubmitButton isPending={isPending} />}
      defaultValues={defaultValues}
      handleSubmit={onHandleSubmit}
      allowedUrls={allowedUrls}
    />
  );
};
