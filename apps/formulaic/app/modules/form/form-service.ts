import { Form } from "@prisma/client";
import { z } from "zod";
import {
  BadRequestError,
  NotAllowedError,
  NotFoundError,
} from "../../lib/error";
import { createLogger, logger } from "../../lib/logger";
import { FormRepository } from "./form-repository";

export function isDomainAllowed({
  origin,
  form,
}: {
  origin: string;
  form: Pick<Form, "domainAllowList">;
}) {
  const allowedDomains = form.domainAllowList;

  if (!allowedDomains.length) {
    return false;
  }

  logger.debug("Checking if domain is allowed", { origin, allowedDomains });

  if (allowedDomains.includes(origin)) {
    return true;
  }

  return false;
}

export const formCreateSchema = z.object({
  schemaContent: z.record(z.any()),
});

export class FormService {
  private logger = createLogger({
    name: "FormService",
  });

  constructor(private repository: FormRepository) {}

  async getById({ id, origin }: { origin: string; id: string }) {
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

    if (!isDomainAllowed({ origin, form })) {
      this.logger.debug("Domain not found in form allow list");
      throw new NotAllowedError("Domain not allowed");
    }

    this.logger.info("Returning form", { form });
    return form;
  }

  async create(body: unknown) {
    this.logger.debug("Creating form");

    const parsed = formCreateSchema.safeParse(body);

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
