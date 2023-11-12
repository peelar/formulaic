import { z } from "zod";
import { BadRequestError, NotFoundError } from "../../lib/error";
import { createLogger } from "../../lib/logger";
import { FormRepository } from "./form-repository";

const formCreateInputSchema = z.object({
  name: z.string(),
  schemaContent: z.record(z.any()),
  domain: z.string().url(),
});

export type FormCreateInput = z.infer<typeof formCreateInputSchema>;

export class FormService {
  private logger = createLogger({
    name: "FormService",
  });

  constructor(private repository: FormRepository) {}

  async getById({ id }: { id: string }) {
    this.logger.debug("Getting form by id", { id });

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      throw new BadRequestError("Missing form id");
    }

    const form = await this.repository.getById(id);

    if (!form) {
      this.logger.debug("No form was found for this id");
      throw new NotFoundError("Form not found");
    }

    this.logger.info("Returning form", { form });
    return form;
  }

  async create(body: unknown) {
    this.logger.debug("Creating form");

    const parsed = formCreateInputSchema.safeParse(body);

    if (!parsed.success) {
      this.logger.debug("Invalid form input", { errors: parsed.error });
      throw new BadRequestError("Invalid form input");
    }

    const input = parsed.data;

    const form = await this.repository.create(input);

    this.logger.info("Returning form", { form });
    return form;
  }
}
