import { PrismaClient } from "@prisma/client";
import { mocks } from "./mocks";

const prisma = new PrismaClient();

async function main() {
  await prisma.form.create({
    data: {
      name: "Test Form",
      domainAllowList: ["https://formulaic-widget.tunnelto.dev"],
      schema: {
        create: {
          content: mocks.schema,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
