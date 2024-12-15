import { Router } from "express";
import passport from "passport";

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

router.post("/login", (req: any, res: any) => {
  // passportの認証処理
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ error: "エラーが発生しました" });
    }
    if (!user) {
      return res.status(400).json({ error: "ユーザーが見つかりません" });
    }
    // ログイン処理
    req.login(user, (err: any) => {
      if (err) {
        return res.status(500).json({ error: "ログイン処理に失敗しました" });
      }
      // パスワードを除外してユーザー情報を返す
      const { password: _, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    });
  })(req, res);
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
