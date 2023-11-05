import { db } from "../../db";

export class FormRepository {
  getById(id: string) {
    return db.form.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        schema: true,
        domainAllowList: true,
      },
    });
  }
}
