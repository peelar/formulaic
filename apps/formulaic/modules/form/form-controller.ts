import { Form } from "@prisma/client";
import { BaseError, NotAllowedError } from "../../lib/error";
import { createLogger, logger } from "../../lib/logger";
import { FormRepository } from "./form-repository";
import { FormService } from "./form-service";

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

export class FormController {
  logger = createLogger({
    name: "FormController",
  });

  private service: FormService;

  constructor() {
    const repository = new FormRepository();
    this.service = new FormService(repository);
  }

  async GET({ id, request }: { request: Request; id: string }) {
    this.logger.debug("Getting form by id", { id });

    const requestHeaders = new Headers(request.headers);
    const origin = requestHeaders.get("origin");

    if (!origin) {
      throw new Error("Missing origin");
    }

    try {
      const form = await this.service.getById({ id });

      return new Response(JSON.stringify(form), { status: 200 });
    } catch (error) {
      this.logger.error("Error getting form", { error });
      if (error instanceof BaseError) {
        return new Response(error.message, { status: error.httpCode });
      }

      throw new Error("Unhandled error!");
    }
  }

  async POST(request: Request) {
    const body = await request.json();

    this.logger.debug("Creating form", { body });

    try {
      const form = await this.service.create(body);

      if (!isDomainAllowed({ origin, form })) {
        this.logger.debug("Domain not found in form allow list");
        throw new NotAllowedError("Domain not allowed");
      }

      return new Response(JSON.stringify(form), { status: 201 });
    } catch (error) {
      this.logger.error("Error creating form", { error });
      if (error instanceof BaseError) {
        return new Response(error.message, { status: error.httpCode });
      }

      throw new Error("Unhandled error!");
    }
  }
}

// todo: move to api package
export type GetFormResponse = Awaited<
  ReturnType<(typeof FormService)["prototype"]["getById"]>
>;

export type CreateFormResponse = Awaited<
  ReturnType<(typeof FormService)["prototype"]["create"]>
>;
