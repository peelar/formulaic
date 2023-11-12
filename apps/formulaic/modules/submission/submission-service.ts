import { z } from "zod";
import { createLogger } from "../../lib/logger";
import { SubmissionRepository } from "./submission-repository";
import { BadRequestError, InternalServerError } from "../../lib/error";

const submissionRepositoryInputSchema = z.object({
  content: z.record(z.any()),
  schemaId: z.string().min(6),
});

export class SubmissionService {
  private logger = createLogger({
    name: "SubmissionService",
  });

  constructor(private repository: SubmissionRepository) {}

  async create(body: unknown) {
    const parsed = submissionRepositoryInputSchema.safeParse(body);

    if (!parsed.success) {
      this.logger.error(parsed.error);
      // todo: return error in response
      throw new BadRequestError("Invalid submission input");
    }

    const input = parsed.data;

    this.logger.debug("Creating submission", { input });

    const submission = await this.repository.create({
      content: input.content,
      schemaId: input.schemaId,
    });

    this.logger.info("Created submission", { submission });

    return submission;
  }
}
