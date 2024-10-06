import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("Search User").click();
  await page.getByPlaceholder("Search User").fill("MinKyawNyunt");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(
    page.getByRole("heading", { name: "MinKyawNyunt" })
  ).toBeVisible();
  await page.getByRole("img", { name: "MinKyawNyunt" }).click();
  await expect(page.getByRole("heading")).toContainText(
    "MINKYAWNYUNT REPOSITORIES"
  );
  await expect(page.locator("body")).toContainText("birthday-responsive");
  await expect(
    page.getByLabel("Go to previous page").locator("span")
  ).toContainText("Previous");
  await expect(
    page.getByLabel("Go to next page").locator("span")
  ).toContainText("Next");
  await expect(page.getByLabel("pagination").getByRole("list")).toContainText(
    "1"
  );
  await page.getByText("birthday-responsive0 stars /").click();
  await expect(page.getByRole("heading")).toContainText(
    "BIRTHDAY-RESPONSIVE REPOSITORY"
  );
  await expect(page.locator("body")).toContainText("New Issue");
  await page.getByRole("button", { name: "New Issue" }).click();
  await expect(page.getByRole("heading")).toContainText("New Issue");
  await expect(page.locator("form")).toContainText("Create");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.locator('[id="\\:r3\\:-form-item-message"]')).toContainText(
    "Title is required!"
  );
  await expect(page.locator('[id="\\:r4\\:-form-item-message"]')).toContainText(
    "Description is required!"
  );
  await page.getByPlaceholder("Title").click();
  await page.getByPlaceholder("Title").fill("testing");
  await page.getByPlaceholder("Description").click();
  await page.getByPlaceholder("Description").fill("testing");
});
