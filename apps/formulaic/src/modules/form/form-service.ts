import { z } from "zod";
import { BadRequestError, NotFoundError } from "../../lib/error";
import { createLogger } from "../../lib/logger";
import { FormRepository } from "./form-repository";

const formCreateInputSchema = z.object({
  userId: z.string(),
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

  async getAllMine({ userEmail }: { userEmail: string }) {
    this.logger.debug("Getting all forms");

    const forms = await this.repository.getAllMine({ userEmail });

    this.logger.info("Returning forms");
    return forms;
  }

  async getById({ id }: { id: string }) {
    this.logger.debug({ id }, "Getting form by id");

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      throw new BadRequestError("Missing form id");
    }

    const form = await this.repository.getById(id);

    if (!form) {
      this.logger.debug("No form was found for this id");
      throw new NotFoundError("Form not found");
    }

    this.logger.info({ form }, "Returning form");
    return form;
  }

  async create(body: unknown) {
    this.logger.debug("Creating form");

    const parsed = formCreateInputSchema.safeParse(body);

    if (!parsed.success) {
      this.logger.debug({ errors: parsed.error }, "Invalid form input");
      throw new BadRequestError("Invalid form input", { cause: parsed.error });
    }

    const input = parsed.data;

    const form = await this.repository.create(input);

    this.logger.info({ formId: form.id }, "Returning form");
    return form;
  }
}
