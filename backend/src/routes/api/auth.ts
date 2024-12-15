import { Router } from "express";

const router = Router();

// TODO: any型を直す
router.get("/me", (req: any, res: any) => {
  // Passportが提供するisAuthenticatedメソッドでチェック
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "認証されていません" });
  }

  // req.user は Passport が自動的にデシリアライズしたユーザー情報
  res.json({ user: req.user });
});

export { router as authRouter };
