"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserFormService } from "./utils";
import { FormInput } from "./form-input.schema";
import { cache } from "react";

export async function createForm(input: FormInput.Schema) {
  const formService = await getUserFormService();
  const form = await formService.create(input);

  redirect(`/form/${form.id}`);
}

export async function updateForm(id: string, input: FormInput.Schema) {
  const formService = await getUserFormService();

  await formService.updateById({ id }, input);

  revalidatePath(`/form/${id}`);
}

export async function deleteForm(id: string) {
  const formService = await getUserFormService();

  await formService.deleteById({ id });

  revalidatePath("/");
}

export const getForm = cache(async (id: string) => {
  const formService = await getUserFormService();
  return formService.getById({ id });
});

export const getAllForms = cache(async () => {
  const formService = await getUserFormService();
  return formService.getAll();
});
