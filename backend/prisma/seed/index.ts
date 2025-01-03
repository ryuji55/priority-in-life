import bcrypt from "bcrypt";
// backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);
  await prisma.users.createMany({
    data: [
      {
        email: "seedData1@example.com",
        firstName: "seedData1",
        password: hashedPassword,
      },
      {
        email: "seedDate2@example.com",
        firstName: "seedData2",
        password: hashedPassword,
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
