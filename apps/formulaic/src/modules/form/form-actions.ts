"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserFormService } from "./utils";
import { FormInput } from "./form-input.schema";
import { cache } from "react";

export async function createForm(input: FormInput.FullSchema) {
  const formService = await getUserFormService();
  const form = await formService.create(input);

  redirect(`/form/${form.id}`);
}

export async function updateBaseForm(id: string, input: FormInput.BaseSchema) {
  const formService = await getUserFormService();

  await formService.updateBaseFormById({ id }, input);

  revalidatePath(`/form/${id}`);
}

export async function updateFormSchemaById(
  id: string,
  input: FormInput.SchemaContentSchema
) {
  const formService = await getUserFormService();

  await formService.updateFormSchemaById({ id }, input);

  revalidatePath(`/form/${id}`);
}

export async function deleteForm(id: string) {
  const formService = await getUserFormService();

  await formService.deleteById({ id });

  revalidatePath("/");
}

export const getForm = cache(async (id: string) => {
  const formService = await getUserFormService();
  return formService.getDetailById({ id });
});

export const getAllForms = cache(async () => {
  const formService = await getUserFormService();
  return formService.getAll();
});

export namespace FormActionsResponse {
  export type GetForm = Awaited<ReturnType<typeof getForm>>;
  export type GetAllForms = Awaited<ReturnType<typeof getAllForms>>;
}
