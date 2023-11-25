"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useToast } from "../../../@/components/ui/use-toast";
import { buildJsonSchemaFromFields } from "../fields-to-json-schema";
import { FormInput } from "../form-input.schema";
import { FORM_CREATOR_ID, FormCreator } from "./form-creator";
import { useAllowedUrls } from "./hooks/useAllowedUrls";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { Button, ButtonProps } from "../../../@/components/ui/button";
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
import { updateBaseForm, updateFormSchemaById } from "../form-actions";

const SubmitButton = ({
  isPending,
  ...props
}: { isPending: boolean } & ButtonProps) => {
  return (
    <Button {...props} disabled={isPending}>
      {isPending ? "Loading..." : "Update"}
    </Button>
  );
};

const UpdateAlert = ({ isPending }: { isPending: boolean }) => {
  const { isDirty } = useFormBuilder();

  if (!isDirty) {
    return <SubmitButton type="submit" isPending={isPending} />;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending}>Update</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to create a new version of this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              Your form may change in time, and we want to keep track of those
              changes. We will create a new version of your form, and all the
              subsequent submissions will be using this new version. You will
              still be able to see the submissions made with the previous
              version.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction form={FORM_CREATOR_ID} type="submit">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const UpdateForm = ({
  defaultValues,
}: {
  defaultValues: FormInput.FullSchema;
}) => {
  const params = useParams();
  const id = params.id as string;

  const [isPending, setIsPending] = React.useState(false);
  const allowedUrls = useAllowedUrls(defaultValues?.urls);
  const { fields, isDirty } = useFormBuilder();
  const { toast } = useToast();

  async function onHandleSubmit(form: FormData) {
    setIsPending(true);

    const rawTheme = form.get("theme");
    const theme = FormInput.themeSchema.parse(rawTheme);

    if (isDirty) {
      await updateFormSchemaById(id, {
        schemaContent: buildJsonSchemaFromFields(fields),
      });
    }

    const input: FormInput.BaseSchema = {
      name: form.get("name") as string,
      urls: allowedUrls.urls,
      theme,
    };

    await updateBaseForm(id, input);
    setIsPending(false);
    toast({
      description: "Your form has been updated",
    });
  }

  return (
    <FormCreator
      submitButton={<UpdateAlert isPending={isPending} />}
      defaultValues={defaultValues}
      handleSubmit={onHandleSubmit}
      allowedUrls={allowedUrls}
    />
  );
};
