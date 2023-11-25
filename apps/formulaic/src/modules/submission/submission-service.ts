import { z } from "zod";
import { createLogger } from "../../lib/logger";
import { SubmissionRepository } from "./submission-repository";
import { BadRequestError, InternalServerError } from "../../lib/error";
import { SessionUser } from "../../../auth";

const submissionRepositoryInputSchema = z.object({
  content: z.record(z.any()),
  schemaId: z.string().min(6),
});

export class SubmissionService {
  private logger = createLogger({
    name: "SubmissionService",
  });

  private repository: SubmissionRepository;
  private user: SessionUser;

  constructor({
    repository,
    user,
  }: {
    repository: SubmissionRepository;
    user: SessionUser;
  }) {
    this.repository = repository;
    this.user = user;
  }

  async getSubmissionsBySchemaId({ schemaId }: { schemaId: string }) {
    this.logger.debug({ schemaId }, "Getting submissions by schema id");

    const submissions = await this.repository.getSubmissionsBySchemaId({
      schemaId,
      userId: this.user.id,
    });

    this.logger.info({ schemaId }, "Returning submissions");
    return submissions;
  }
}
