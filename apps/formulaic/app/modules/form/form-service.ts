import { Form } from "@prisma/client";
import { createLogger, logger } from "../../lib/logger";
import { FormRepository } from "./form-repository";

// todo: move
type Nullable<T> = T | null | undefined;

export function isDomainAllowed(
  request: Request,
  form: Pick<Form, "domainAllowList">
) {
  const requestHeaders = new Headers(request.headers);
  const origin = requestHeaders.get("origin");

  if (!origin) {
    throw new Error("Missing origin");
  }

  const allowedDomains = form.domainAllowList;

  if (!allowedDomains.length) {
    return false;
  }

  logger.debug({ origin, allowedDomains }, "Checking if domain is allowed");

  if (allowedDomains.includes(origin)) {
    return true;
  }

  return false;
}

export class FormService {
  private logger = createLogger({
    name: "FormService",
  });

  constructor(private repository: FormRepository) {}

  async getById({ id, request }: { request: Request; id: Nullable<string> }) {
    this.logger.debug({ id }, "Getting form by id");

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      return new Response("Missing id", { status: 400 });
    }

    const form = await this.repository.getById(id);

    if (!form) {
      this.logger.debug("No form was found for this id");
      return new Response("Not found", { status: 404 });
    }

    if (!isDomainAllowed(request, form)) {
      this.logger.debug("Domain not found in form allow list");
      return new Response("Not allowed", { status: 403 });
    }

    this.logger.debug({ form }, "Returning form");
    return new Response(JSON.stringify(form), {
      status: 200,
    });
  }
}
