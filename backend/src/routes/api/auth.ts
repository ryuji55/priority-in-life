import bcrypt from "bcrypt";
import { Router } from "express";
import passport from "passport";
import { mailService } from "../../serviece/mail.serviece";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import dayjs from "dayjs";

const router = Router();

const prisma = new PrismaClient();

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const generateResetPasswordTokenExpiredAt = () => {
  return dayjs().add(1, "hour").toISOString();
};

// TODO: any型を直す
router.get("/me", (req: any, res: any) => {
  // Passportが提供するisAuthenticatedメソッドでチェック
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "UN_AUTHORIZED" });
  }

  // req.user は Passport が自動的にデシリアライズしたユーザー情報
  res.status(200).json({ user: req.user });
});

router.post("/login", (req: any, res: any) => {
  const authenticateFunction = passport.authenticate(
    "local",
    (err: any, user: any, info: any) => {
      if (err) {
        console.error("AppError: Authenticate", err);
        return res.status(500).end();
      }
      if (!user) {
        return res.status(400).json({ message: "LOGIN_FAILED" });
      }
      req.login(user, (err: any) => {
        if (err) {
          console.error("AppError: Login", err);
          return res.status(500).end();
        }
        // パスワードを除外してユーザー情報を返す
        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json({ user: userWithoutPassword });
      });
    }
  );
  authenticateFunction(req, res);
});

router.post("/logout", (req: any, res: any) => {
  // passportのログアウト処理
  req.logout((err: any) => {
    if (err) {
      console.error("AppError: Logout", err);
      return res.status(500).end();
    }
    // セッション全体を破棄
    req.session.destroy((err: any) => {
      if (err) {
        console.error("Session destroy error:", err);
        // セッション破棄失敗でもログアウト自体は成功とみなす
        res.clearCookie("connect.sid");
        return res.status(200).end();
      }
      // Cookieも削除
      res.clearCookie("connect.sid");
      res.status(200).end();
    });
  });
});

router.post("/password/forgot", async (req: any, res: any) => {
  try {
    const { email } = req.body;

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }

    const resetPasswordToken = generateResetToken();
    const resetPasswordTokenExpiredAt = generateResetPasswordTokenExpiredAt();

    await prisma.users.update({
      where: { id: user.id },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiredAt,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetPasswordToken}`;

    await mailService.sendPasswordResetMail(email, resetUrl);
    res.status(200).end();
  } catch (error) {
    console.error("AppError: PasswordReset", error);
    res.status(500).end();
  }
});

router.post("/password/reset", async (req: any, res: any) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpiredAt: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      console.error("Password reset token invalid");
      return res.status(400).json({
        message: "PASSWORD_RESET_TOKEN_INVALID",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiredAt: null,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("AppError: PasswordReset", error);
    res.status(500).end();
  }
});

export { router as authRouter };
