import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

// Redisはアンインストールしたが、以下のコードは残しておく
// // Redisクライアントの設定
// const redisClient = createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379",
// });

// // Redisへの接続
// redisClient.connect().catch(console.error);

// // Redisストアの作成
// const redisStore = new RedisStore({
//   client: redisClient,
// });

// app.use(
//   session({
//     // セッション情報の保存先をRedisに指定
//     // デフォルトはexpress-sessionを使用することで使えるメモリストア（サーバーのメモリ）に保存される
//     // 本番環境ではメモリストアを使うとサーバーのメモリを圧迫するため、Redisなどの外部ストアを使う
//     store: redisStore,
//     // セッションIDを署名・暗号化するための秘密鍵
//     secret: process.env.SESSION_SECRET!,
//     // セッションに変更がない場合でも強制的に保存するかどうか
//     // falseにすることでパフォーマンスを改善
//     resave: false,
//     // 初期化されていないセッションを保存するかどうか
//     // falseにすることで不要なセッション保存を防ぐ
//     // ログイン済みユーザーのみセッションを作成する場合に有用
//     saveUninitialized: false,
//     cookie: {
//       // JavaScriptからクッキーへのアクセスを禁止
//       // XSS対策
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24, // 24時間
//       // 本番環境の場合、HTTPSでのみクッキーを送信
//       secure: process.env.NODE_ENV === "production",
//     },
//   })
// );

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
