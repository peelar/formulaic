import { prisma, Prisma } from "../../../prisma";

export type SubmissionCreateInput = Pick<
  Prisma.SubmissionCreateInput,
  "content"
> & { schemaId: string };

export class SubmissionRepository {
  constructor(private db = prisma) {}

  getSubmissionsBySchemaId({
    schemaId,
    userId,
  }: {
    schemaId: string;
    userId: string;
  }) {
    return this.db.submission.findMany({
      where: {
        schema: {
          id: schemaId,
          userId,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });
  }

  create(data: SubmissionCreateInput) {
    return this.db.submission.create({
      data: {
        content: data.content,
        schema: {
          connect: {
            id: data.schemaId,
          },
        },
      },
    });
  }
}
