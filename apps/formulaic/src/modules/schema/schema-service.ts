import { SessionUser } from "../../../auth";
import { createLogger } from "../../lib/logger";
import { SchemaRepository } from "./schema-repository";

export class SchemaService {
  private logger = createLogger({
    name: "FormService",
  });

  private repository: SchemaRepository;
  private user: SessionUser;

  constructor({
    repository,
    user,
  }: {
    repository: SchemaRepository;
    user: SessionUser;
  }) {
    this.repository = repository;
    this.user = user;
  }

  async getVersions({ formId }: { formId: string }) {
    this.logger.debug("Getting form schema versions");

    const versions = await this.repository.getVersions({
      userId: this.user.id,
      formId: formId,
    });

    this.logger.info("Returning schema versions");
    return versions;
  }
}
