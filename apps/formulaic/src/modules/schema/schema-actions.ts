"use server";

import { cache } from "react";
import { getUser } from "../../../auth";
import { SchemaRepository } from "./schema-repository";
import { SchemaService } from "./schema-service";
import { GetResponseFromPromiseFunction } from "../../lib/types";

async function getUserSchemaService() {
  const repository = new SchemaRepository();
  const user = await getUser();
  const schemaService = new SchemaService({ repository, user });

  return schemaService;
}

export const getFormSchemaVersions = cache(
  async ({ formId }: { formId: string }) => {
    const schemaService = await getUserSchemaService();

    return schemaService.getVersions({ formId });
  }
);

export namespace SchemaActionsResponse {
  export type GetFormSchemaVersions = GetResponseFromPromiseFunction<
    typeof getFormSchemaVersions
  >;
}
