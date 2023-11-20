"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormCreateInput } from "./form-service";
import { getUserFormService } from "./utils";

export async function createForm(
  input: Pick<FormCreateInput, "name" | "domain" | "schemaContent">
) {
  const formService = await getUserFormService();
  const form = await formService.create(input);

  redirect(`/form/${form.id}`);
}

export async function deleteForm(id: string) {
  const formService = await getUserFormService();

  await formService.deleteById({ id });

  revalidatePath("/");
}
