import { test, expect } from "@playwright/test";
import { tasks } from "./task/reset";

test.describe("ログイン機能", () => {
  test.beforeAll(async () => {
    await tasks["db:reset"]();
  });
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("ログインの基本フロー", async ({ page }) => {
    await expect(page.getByRole("heading")).toHaveText("ログインページ");

    await page.getByLabel("メールアドレス").fill("seedData1@example.com");
    await page.getByLabel("パスワード").fill("password");

    await page.getByRole("button", { name: "送信" }).click();

    await expect(page).toHaveURL("/auth");
  });
});
