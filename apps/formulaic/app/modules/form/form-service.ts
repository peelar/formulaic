import { Form } from "@prisma/client";
import { FormRepository } from "./form-repository";
import { Logger } from "../../lib/logger";

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

  if (allowedDomains.includes(origin)) {
    return true;
  }

  return false;
}

export class FormService {
  private repository: FormRepository;
  private request: Request;
  private logger: Logger;

  constructor({
    request,
    repository,
  }: {
    request: Request;
    repository: FormRepository;
  }) {
    this.repository = repository;
    this.request = request;
  }

  async getById(id: Nullable<string>) {
    this.logger.debug("getById", { id });

    if (!id) {
      this.logger.debug("Form id is either null or undefined");
      return new Response("Missing id", { status: 400 });
    }

    const form = await this.repository.getById(id);

    if (!form) {
      this.logger.debug("No form was found for this id");
      return new Response("Not found", { status: 404 });
    }

    if (!isDomainAllowed(this.request, form)) {
      this.logger.debug("Domain not found in form allow list");
      return new Response("Not allowed", { status: 403 });
    }

    this.logger.debug({ form }, "Returning form");
    return new Response(JSON.stringify(form), {
      status: 200,
      headers: {
        // todo: add real CORS policy here
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
