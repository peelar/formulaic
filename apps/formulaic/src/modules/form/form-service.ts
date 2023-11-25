import { z } from "zod";
import { SessionUser } from "../../../auth";
import { BadRequestError, NotFoundError } from "../../lib/error";
import { createLogger } from "../../lib/logger";
import { FormRepository } from "./form-repository";
import { FormInput } from "./form-input.schema";

export class FormService {
  private logger = createLogger({
    name: "FormService",
  });

  private repository: FormRepository;
  private user: SessionUser;

  constructor({
    repository,
    user,
  }: {
    repository: FormRepository;
    user: SessionUser;
  }) {
    this.repository = repository;
    this.user = user;
  }

  async getAll() {
    this.logger.debug("Getting all forms");

    const forms = await this.repository.getAll({ userId: this.user.id });

    this.logger.info("Returning forms");
    return forms;
  }

  async getBaseById({ id }: { id: string }) {
    this.logger.debug({ id }, "Getting base form by id");

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      throw new BadRequestError("Missing form id");
    }

    const form = await this.repository.getBaseById({ id });

    if (!form) {
      this.logger.debug("No form was found for this id");
      throw new NotFoundError("Form not found");
    }

    this.logger.info({ id: form.id }, "Returning base form");
    return form;
  }

  async getDetailById({ id }: { id: string }) {
    this.logger.debug({ id }, "Getting detailed form by id");

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      throw new BadRequestError("Missing form id");
    }

    const form = await this.repository.getDetailsById({
      id,
      userId: this.user.id,
    });

    if (!form) {
      this.logger.debug("No form was found for this id");
      throw new NotFoundError("Form not found");
    }

    this.logger.info({ id: form.id }, "Returning detailed form");
    return form;
  }

  async create(body: unknown) {
    this.logger.debug("Creating form");

    const parsed = FormInput.schema.safeParse(body);

    if (!parsed.success) {
      this.logger.debug({ errors: parsed.error }, "Invalid form input");
      throw new BadRequestError("Invalid form input", { cause: parsed.error });
    }

    const input = parsed.data;

    const form = await this.repository.create({ input, userId: this.user.id });

    this.logger.info({ name: form.name }, "Returning form: ");
    return form;
  }

  async deleteById({ id }: { id: string }) {
    this.logger.debug({ id }, "Deleting form by id");

    await this.repository.deleteById({ id, userId: this.user.id });

    this.logger.info({ id }, "Form deleted");
  }

  async updateByIdWithNewSchema({ id }: { id: string }, body: unknown) {
    const parsed = FormInput.schema.safeParse(body);

    if (!parsed.success) {
      this.logger.debug({ errors: parsed.error }, "Invalid form input");
      throw new BadRequestError("Invalid form input", { cause: parsed.error });
    }

    const input = parsed.data;

    this.logger.debug({ input }, "Updating form with input");

    const form = await this.repository.updateByIdWithNewSchema(
      { id, userId: this.user.id },
      input
    );

    this.logger.info({ id }, "Form updated");

    return form;
  }
}
