"use server";

import { redirect } from "next/navigation";
import { FormRepository } from "./form-repository";
import { FormCreateInput, FormService } from "./form-service";

export async function createForm(input: FormCreateInput) {
  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);

  const form = await formService.create(input);

  redirect(`/form/${form.id}`);
}
