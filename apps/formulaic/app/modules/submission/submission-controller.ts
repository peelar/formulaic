import { BaseError } from "../../lib/error";
import { createLogger } from "../../lib/logger";
import { SubmissionRepository } from "./submission-repository";
import { SubmissionService } from "./submission-service";

export class SubmissionController {
  logger = createLogger({
    name: "SubmissionController",
  });

  private service: SubmissionService;

  constructor() {
    const repository = new SubmissionRepository();
    this.service = new SubmissionService(repository);
  }

  async POST(request: Request) {
    const body = await request.json();

    this.logger.debug("Creating submission", { body });

    try {
      const form = await this.service.create(body);

      return new Response(JSON.stringify(form), { status: 201 });
    } catch (error) {
      this.logger.error("Error creating submission", { error });
      if (error instanceof BaseError) {
        return new Response(error.message, { status: error.httpCode });
      }

      throw new Error("Unhandled error!");
    }
  }
}
