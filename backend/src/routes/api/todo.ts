import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const todos = await prisma.todos.findMany();
    res.json(todos);
  } catch (error) {
    console.error("GetTodosError:", error);
    res.status(500).end();
  }
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    await prisma.todos.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).end();
  } catch (error) {
    console.error("CreateTodoError:", error);
    res.status(500).end();
  }
});

export { router as todoRouter };
