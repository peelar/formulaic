"use server";

import { redirect } from "next/navigation";
import { FormRepository } from "./form-repository";
import { FormCreateInput, FormService } from "./form-service";
import { auth, getUser } from "../../../auth";

export async function createForm(
  input: Pick<FormCreateInput, "name" | "domain" | "schemaContent">
) {
  const repository = new FormRepository();
  const user = await getUser();

  const formService = new FormService({ repository, user });
  const session = await auth();

  console.log("createForm", session);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Missing user id");
  }

  const form = await formService.create({ ...input, userId });

  redirect(`/form/${form.id}`);
}
