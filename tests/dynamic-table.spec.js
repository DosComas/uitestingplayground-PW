import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { DynamicTable } from "../page-objects/dynamictable-page";

test.describe("Dynamic Table Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await test.step(`Go to Text Input`, async () => {
      const homePage = new HomePage(page);
      await homePage.gotoExamplePageLink("Dynamic Table", "/dynamictable");
    });
  });

  test("Dynamic Table @smoke @regression", async ({ page }) => {
    const dynamicTable = new DynamicTable(page);

    test.info().annotations.push({
      type: "Test",
      description:
        "The purpose of this test is to practice automation using Playwright",
    });

    const chromeTableCPU = await test.step("Get Chrome Table CPU load", async () => {
      return dynamicTable.getTableInfo("Chrome", "CPU");
    });

    const chromeYellowCPU = await test.step("Get Chrome Yellow CPU load", async () => {
      return dynamicTable.getYellowTextInfo();
    });

    await test.step("Validate that TABLE and YELLOW Chrome CPU loads are equal", async () => {
      expect(chromeYellowCPU).toContain(chromeTableCPU);
    });
  });
});

test("Dynamic Table --Not POM-- @regression", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Dynamic Table" }).click();

  const headers = await page.getByRole("columnheader").allInnerTexts();
  const cells = await page.getByRole("cell").allInnerTexts();

  expect(headers).toContain("CPU");
  expect(cells).toContain("Chrome");

  const chromeTableCPU = cells[headers.indexOf("CPU") + cells.indexOf("Chrome")];
  const chromeYellowCPU = await page.locator(".bg-warning").innerText();

  expect(chromeYellowCPU).toContain(chromeTableCPU);
});
