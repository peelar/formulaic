import { Form } from "@prisma/client";
import { BaseError } from "../../../lib/error";
import { createLogger, logger } from "../../../lib/logger";
import { FormRepository } from "../form-repository";

import { PublicFormService } from "./public-form-service";

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

export class PublicFormController {
  logger = createLogger({
    name: "PublicFormController",
  });

  private service: PublicFormService;

  constructor({ repository }: { repository: FormRepository }) {
    this.service = new PublicFormService({ repository });
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
}
