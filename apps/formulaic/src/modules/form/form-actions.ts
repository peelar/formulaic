"use server";

import { redirect } from "next/navigation";
import { FormRepository } from "./form-repository";
import { FormCreateInput, FormService } from "./form-service";
import { auth } from "../../../auth";

export async function createForm(
  input: Pick<FormCreateInput, "name" | "domain" | "schemaContent">
) {
  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);
  const session = await auth();

  console.log("createForm", session);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Missing user id");
  }

  const form = await formService.create({ ...input, userId });

  redirect(`/form/${form.id}`);
}
