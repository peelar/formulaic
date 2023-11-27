"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormInput } from "./form-input.schema";
import { cache } from "react";
import { getUser } from "../../../auth";
import { FormRepository } from "./form-repository";
import { FormService } from "./form-service";
import { GetResponseFromPromiseFunction } from "../../lib/types";

async function getUserFormService() {
  const repository = new FormRepository();
  const user = await getUser();
  const formService = new FormService({ repository, user });

  return formService;
}

export async function createForm(input: FormInput.FullSchema) {
  const formService = await getUserFormService();
  const form = await formService.create(input);

  redirect(`/${form.slug}`);
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

export const getForm = cache(async ({ slug }: { slug: string }) => {
  const formService = await getUserFormService();
  return formService.getDetailBySlug({ slug });
});

export const getAllForms = cache(async () => {
  const formService = await getUserFormService();
  return formService.getAll();
});

export namespace FormActionsResponse {
  export type GetForm = GetResponseFromPromiseFunction<typeof getForm>;
  export type GetAllForms = GetResponseFromPromiseFunction<typeof getAllForms>;
}
