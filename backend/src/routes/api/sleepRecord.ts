import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// 睡眠記録の作成
router.post("/", async (req: any, res: any) => {
  try {
    const { hours, date } = req.body;
    const record = await prisma.sleepRecords.create({
      data: {
        hours: parseFloat(hours),
        date: new Date(date),
        UserId: req.user.id,
      },
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error creating sleep record" });
  }
});

// 睡眠記録の取得
router.get("/", async (req: any, res: any) => {
  try {
    const records = await prisma.sleepRecords.findMany({
      where: {
        UserId: req.user.id,
      },
      orderBy: {
        date: "asc",
      },
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sleep records" });
  }
});

export { router as sleepRecordRouter };
