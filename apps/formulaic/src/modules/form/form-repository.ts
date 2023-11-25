import { env } from "../../../env.mjs";
import { prisma } from "../../../prisma";
import { FormInput } from "./form-input.schema";

// idea: try/catch? and return { data, error }
export class FormRepository {
  getAll({ userId }: { userId: string }) {
    return prisma.form.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  /**
   * @returns Base form data with the latest schema version
   */
  async getBaseById({ id }: { id: string }) {
    const form = await prisma.form.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        domainAllowList: true,
        theme: true,
        schemas: {
          take: 1,
          select: {
            content: true,
          },
        },
      },
    });

    if (!form) {
      return null;
    }

    const { schemas, ...rest } = form;

    return {
      ...rest,
      schema: schemas[0],
    };
  }

  /**
   * @returns Form data with the latest schema version and submissions
   */
  async getDetailsById({ id, userId }: { id: string; userId: string }) {
    const form = await prisma.form.findFirst({
      where: { id, authorId: userId },
      select: {
        id: true,
        name: true,
        domainAllowList: true,
        theme: true,
        schemas: {
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
            submissions: true,
          },
        },
      },
    });

    if (!form) {
      return null;
    }

    const { schemas, ...rest } = form;

    return {
      ...rest,
      schema: schemas[0],
    };
  }

  create({
    input: data,
    userId,
  }: {
    input: FormInput.FullSchema;
    userId: string;
  }) {
    return prisma.form.create({
      data: {
        name: data.name,
        domainAllowList: {
          set: [
            ...(process.env.NODE_ENV === "development" ? [env.WIDGET_URL] : []),
            ...data.urls,
          ],
        },
        schemas: {
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
      where: { id, authorId: userId },
    });
  }

  /**
   * @description Creates a new schema version on each update
   */
  updateFormSchemaById(
    { id, userId }: { id: string; userId: string },
    data: FormInput.SchemaContentSchema
  ) {
    return prisma.form.update({
      where: { id, authorId: userId },
      data: {
        schemas: {
          create: {
            content: data.schemaContent,
          },
        },
      },
    });
  }

  updateBaseFormById(
    { id, userId }: { id: string; userId: string },
    data: FormInput.BaseSchema
  ) {
    return prisma.form.update({
      where: { id, authorId: userId },
      data: {
        name: data.name,
        theme: data.theme,
        domainAllowList: {
          set: data.urls,
        },
      },
    });
  }
}
