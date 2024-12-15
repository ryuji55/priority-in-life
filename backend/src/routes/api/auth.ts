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

router.post("/logout", (req: any, res: any) => {
  // passportのログアウト処理
  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({ error: "ログアウトに失敗しました" });
    }
    // セッション全体を破棄
    req.session.destroy((err: any) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "セッションの破棄に失敗しました" });
      }
      // Cookieも削除
      res.clearCookie("connect.sid");
      res.json({ message: "ログアウトしました" });
    });
  });
});

export { router as authRouter };
