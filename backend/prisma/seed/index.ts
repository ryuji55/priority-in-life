// backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      {
        email: "seedData1@example.com",
        firstName: "seedData1",
        password: "password",
      },
      {
        email: "seedDate2@example.com",
        firstName: "seedData2",
        password: "password",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
