import { z } from "zod";
import { createLogger } from "../../lib/logger";
import { SubmissionRepository } from "./submission-repository";

const submissionRepositoryInputSchema = z.object({
  content: z.record(z.any()),
  formId: z.string().min(6),
});

export class SubmissionService {
  private logger = createLogger({
    name: "SubmissionService",
  });

  constructor(private repository: SubmissionRepository) {}

  async create(request: Request) {
    this.logger.debug("create");

    const body = await request.json();

    const parsed = submissionRepositoryInputSchema.safeParse(body);

    if (!parsed.success) {
      this.logger.error(parsed.error);
      // todo: return error in response
      return new Response("Invalid input", { status: 400 });
    }

    const input = parsed.data;

    try {
      const submission = await this.repository.create({
        content: input.content,
        formId: input.formId,
      });

      this.logger.info({ submission }, "created submission");

      return new Response(JSON.stringify(submission), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // todo: read error and decide on status code
      this.logger.error(error);

      //  todo: return error in response
      return new Response("Internal server error", { status: 500 });
    }
  }
}
