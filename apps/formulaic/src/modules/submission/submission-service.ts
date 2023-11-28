import { z } from "zod";
import { createLogger } from "../../lib/logger";
import { SubmissionRepository } from "./submission-repository";
import { BadRequestError, InternalServerError } from "../../lib/error";
import { SessionUser } from "../../../auth";

const submissionRepositoryInputSchema = z.object({
  content: z.record(z.any()),
  schemaVersion: z.string().min(6),
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

  async getSubmissionsBySchemaVersion({
    schemaVersion,
  }: {
    schemaVersion: number;
  }) {
    this.logger.debug(
      { schemaVersion },
      "Getting submissions by schema version"
    );

    const submissions = await this.repository.getSubmissionsBySchemaVersion({
      schemaVersion,
      userId: this.user.id,
    });

    this.logger.info({ schemaVersion }, "Returning submissions");
    return submissions;
  }
}
