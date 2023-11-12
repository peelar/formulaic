"use server";

import { redirect } from "next/navigation";
import { FormRepository } from "./form-repository";
import { FormCreateInput, FormService } from "./form-service";

export async function createForm(formData: FormData) {
  const schemaContent = formData.get("schemaContent");
  const name = formData.get("name");
  const domain = formData.get("domain");

  if (!schemaContent || !name || !domain) {
    throw new Error("Missing form data");
  }

  if (
    typeof schemaContent !== "string" ||
    typeof name !== "string" ||
    typeof domain !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  const input: FormCreateInput = {
    schemaContent: JSON.parse(schemaContent),
    name,
    domain,
  };

  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);

  const form = await formService.create(input);

  redirect(`/form/${form.id}`);
}
