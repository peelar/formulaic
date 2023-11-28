"use server";

import { cache } from "react";
import { getUser } from "../../../auth";
import { GetResponseFromPromiseFunction } from "../../lib/types";
import { SubmissionRepository } from "./submission-repository";
import { SubmissionService } from "./submission-service";

async function getUserSubmissionService() {
  const repository = new SubmissionRepository();
  const user = await getUser();
  const schemaService = new SubmissionService({ repository, user });

  return schemaService;
}

export const getSubmissionsBySchemaVersion = cache(
  async ({ schemaVersion }: { schemaVersion: number }) => {
    const service = await getUserSubmissionService();

    return service.getSubmissionsBySchemaVersion({ schemaVersion });
  }
);

export namespace SubmissionActionsResponse {
  export type GetSubmissionsBySchemaVersion = GetResponseFromPromiseFunction<
    typeof getSubmissionsBySchemaVersion
  >;
}
