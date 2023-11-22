import { BadRequestError, NotFoundError } from "../../../lib/error";
import { createLogger } from "../../../lib/logger";
import { FormRepository } from "../form-repository";

export class PublicFormService {
  private logger = createLogger({
    name: "FormService",
  });

  private repository: FormRepository;

  constructor({ repository }: { repository: FormRepository }) {
    this.repository = repository;
  }

  async getById({ id }: { id: string }) {
    this.logger.debug({ id }, "Getting form by id");

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      throw new BadRequestError("Missing form id");
    }

    const form = await this.repository.getById({ id });

    if (!form) {
      this.logger.debug("No form was found for this id");
      throw new NotFoundError("Form not found");
    }

    this.logger.info({ name: form.name }, "Returning form: ");
    return form;
  }
}
