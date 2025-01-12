import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get("/my", async (req: any, res: any) => {
  try {
    const todos = await prisma.todos.findMany({
      where: {
        UserId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(todos);
  } catch (error) {
    console.error("GetTodosError:", error);
    res.status(500).end();
  }
});

router.post("/", async (req: any, res: any) => {
  const { title, content } = req.body;
  try {
    await prisma.todos.create({
      data: {
        title,
        content,
        UserId: req.user.id,
      },
    });
    res.status(201).end();
  } catch (error) {
    console.error("CreateTodoError:", error);
    res.status(500).end();
  }
});

export { router as todoRouter };
