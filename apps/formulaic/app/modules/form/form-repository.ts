import { prisma } from "../../prisma";

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
}
