import { prisma, Prisma } from "../../../prisma";

export type SubmissionCreateInput = Pick<
  Prisma.SubmissionCreateInput,
  "content"
> & { schemaId: string };

export class SubmissionRepository {
  create(data: SubmissionCreateInput) {
    return prisma.submission.create({
      data: {
        content: data.content,
        versionedSchema: {
          connect: {
            id: data.schemaId,
          },
        },
      },
    });
  }
}
