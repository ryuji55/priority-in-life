import { test, expect } from "@playwright/test";
import { tasks } from "./task/reset";

test.describe("ユーザー登録機能", () => {
  test.beforeAll(async () => {
    await tasks["db:reset"]();
  });
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("新規ユーザー登録の基本フロー", async ({ page }) => {
    await expect(page.getByRole("heading")).toHaveText("登録ページ");

    await page.getByLabel("名前").fill("テストユーザー");
    await page.getByLabel("メールアドレス").fill("test@example.com");
    await page.getByLabel("パスワード").fill("password123");

    await page.getByRole("button", { name: "送信" }).click();

    await expect(page).toHaveURL("/register");
  });
});
