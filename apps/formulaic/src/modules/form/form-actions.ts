"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormInput } from "./form-service";
import { getUserFormService } from "./utils";

export async function createForm(input: FormInput) {
  const formService = await getUserFormService();
  const form = await formService.create(input);

  redirect(`/form/${form.id}`);
}

export async function updateForm(id: string, input: FormInput) {
  const formService = await getUserFormService();

  await formService.updateById({ id }, input);

  revalidatePath(`/form/${id}`);
}

export async function deleteForm(id: string) {
  const formService = await getUserFormService();

  await formService.deleteById({ id });

  revalidatePath("/");
}
