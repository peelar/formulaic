"use server";

import { FormRepository } from "./form-repository";
import { FormService } from "./form-service";

export async function createForm(_prevData: any, formData: FormData) {
  const schemaContent = formData.get("schemaContent") as string;
  const schema = JSON.parse(schemaContent);

  const input = {
    schemaContent: schema,
  };

  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);

  const form = await formService.create(input);

  return { message: `Form ${form.id} created` };
}
