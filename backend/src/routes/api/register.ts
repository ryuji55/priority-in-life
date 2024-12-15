import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

// TODO: any型を直す
router.post("/", async (req: any, res: any) => {
  try {
    const { firstName, email, password } = req.body;

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "このメールアドレスは既に登録されています" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        firstName,
        email,
        password: hashedPassword,
      },
    });

    // 登録後自動的にログイン
    req.login(user, (err: any) => {
      if (err) {
        return res.status(500).json({ error: "ログインに失敗しました" });
      }
      const { password: _, ...userWithoutPassword } = user;
      return res.status(201).json({ user: userWithoutPassword });
    });
  } catch (error) {
    console.error("ユーザ登録エラー:", error);
    res.status(500).json({ error: "登録に失敗しました" });
  }
});

export { router as registerRouter };
