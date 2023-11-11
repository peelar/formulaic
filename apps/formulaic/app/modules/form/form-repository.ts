import { prisma, Prisma } from "../../prisma";

export type FormCreateInput = {
  schemaContent: Prisma.InputJsonValue;
};

// idea: try/catch? and return { data, error }
export class FormRepository {
  getById(id: string) {
    return prisma.form.findFirst({
      where: { id },
      select: {
        id: true,
        schema: true,
        domainAllowList: true,
      },
    });
  }

  create(data: FormCreateInput) {
    return prisma.form.create({
      data: {
        schema: {
          create: {
            content: data.schemaContent,
          },
        },
        // todo: remove this
        domainAllowList: ["https://formulaic-widget.tunnelto.dev"],
      },
    });
  }
}
