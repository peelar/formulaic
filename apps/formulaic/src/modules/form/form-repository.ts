import { env } from "../../../env.mjs";
import { prisma } from "../../../prisma";
import { FormCreateInput } from "./form-service";

// idea: try/catch? and return { data, error }
export class FormRepository {
  getAllMine({ userEmail }: { userEmail: string }) {
    return prisma.form.findMany({
      where: {
        author: {
          email: userEmail,
        },
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

  getById(id: string) {
    return prisma.form.findFirst({
      where: { id },
      select: {
        id: true,
        schema: true,
        name: true,
      },
    });
  }

  create(data: FormCreateInput) {
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
      },
    });
  }
}
