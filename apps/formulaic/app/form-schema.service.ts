import { db } from "./db";

export class FormSchemaService {
  getById(id: string) {
    return db.form.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        schema: true,
      },
    });
  }
}
