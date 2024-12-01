import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
