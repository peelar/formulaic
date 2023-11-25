import { prisma } from "../../../prisma";
import { logger } from "../../lib/logger";

export class SchemaRepository {
  constructor(private db = prisma) {}

  getVersions({ formId, userId }: { formId: string; userId: string }) {
    logger.debug({ formId, userId }, "Getting form schema versions");
    return this.db.schema.findMany({
      where: {
        formId,
        userId,
      },
      select: {
        version: true,
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
