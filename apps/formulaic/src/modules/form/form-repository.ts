import { env } from "../../../env.mjs";
import { prisma } from "../../../prisma";
import { FormCreateInput } from "./form-service";

// idea: try/catch? and return { data, error }
export class FormRepository {
  getAllMine({ userId }: { userId: string }) {
    return prisma.form.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        name: true,
        domainAllowList: true,
        createdAt: true,
        schema: {
          include: {
            _count: { select: { submissions: true } },
          },
        },
      },
    });
  }

  getById({ id }: { id: string }) {
    return prisma.form.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        schema: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            submissions: {
              select: {
                id: true,
                content: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
  }

  create({ input: data, userId }: { input: FormCreateInput; userId: string }) {
    return prisma.form.create({
      data: {
        name: data.name,
        domainAllowList: [
          ...(process.env.NODE_ENV === "development" ? [env.WIDGET_URL] : []),
          data.domain,
        ],
        schema: {
          create: {
            content: data.schemaContent,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  deleteById({ id, userId }: { id: string; userId: string }) {
    return prisma.form.delete({
      where: { id },
    });
  }
}
