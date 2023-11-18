import { Form } from "@prisma/client";
import { BaseError, NotAllowedError } from "../../lib/error";
import { createLogger, logger } from "../../lib/logger";
import { FormRepository } from "./form-repository";
import { FormService } from "./form-service";
import { Session } from "next-auth/types";
import { SessionUser } from "../../../auth";

export class FormController {
  logger = createLogger({
    name: "FormController",
  });

  private service: FormService;

  constructor({
    repository,
    user,
  }: {
    repository: FormRepository;
    user: SessionUser;
  }) {
    this.service = new FormService({ repository, user });
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
