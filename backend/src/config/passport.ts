import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ローカルストラテジーの設定
// ユーザーがログインする際に呼び出される
export const configurePassport = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email", // クライアントからのフィールド名
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await prisma.users.findUnique({ where: { email } });
          if (!user) {
            return done(null, false, {
              message: "メールアドレスが見つかりません",
            });
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return done(null, false, {
              message: "パスワードが正しくありません",
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // シリアライズとデシリアライズ
  // sessionに保存する情報を指定
  // ここではユーザーのIDのみを保存
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: { id },
        select: { id: true, email: true, firstName: true },
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
