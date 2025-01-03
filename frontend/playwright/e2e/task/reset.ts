import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const tasks = {
  "db:reset": async () => {
    const backendPath = path.resolve(__dirname, "../../../../backend");
    execSync("npx prisma migrate reset -f", {
      stdio: "inherit",
      cwd: backendPath,
    });
  },
};
